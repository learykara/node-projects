const _ = require('lodash');
const bodyParser = require('body-parser');
const express = require('express');

const jsonParser = bodyParser.json();

class Storage {
  constructor() {
    this.items = [];
    this.id = 0;
  }

  add(name, id=null) {
    if (!id) {
      id = this.id;
      this.id += 1;
    }
    const item = {name: name, id: id};
    this.items.push(item);
    return item;
  }

  delete(id) {
    this.items = this.items.filter(item => item.id !== id);
  }

  find(id) {
    return _.find(this.items, {id: id});
  }

  update(name, id) {
    this.items = this.items.map(item => {
      if (item.id === id) {
        item.name = name;
      }
      return item;
    });
  }

  upsert(name, id) {
    const toUpdate = this.find(id);
    if (!toUpdate) {
      this.add(name, id);
    } else {
      this.update(name, id);
    }
  }
}

const storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

const app = express();
app.use(express.static('public'));

app.get('/items', (req, res) => {
  res.json(storage.items);
});

app.post('/items', jsonParser, (req, res) => {
  if (!req.body) {
    return res.sendStatus(400);
  }

  const item = storage.add(req.body.name);
  res.status(201).json(item);
});

app.delete('/items/:id', (req, res) => {
  storage.delete(parseInt(req.params.id));
  return res.sendStatus(204);
});

app.put('/items/:id', jsonParser, (req, res) => {
  if (!req.body) {
    return res.sendStatus(400);
  }
  storage.upsert(req.body.name, parseInt(req.body.id));
});

app.listen(process.env.PORT || 8080);
