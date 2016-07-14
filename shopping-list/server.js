const express = require('express');

class Storage {
  constructor() {
    this.items = [];
    this.id = 0;
  }

  add(name) {
    const item = {name: name, id: this.id};
    this.items.push(item);
    this.id += 1;
    return item;
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

app.listen(process.env.PORT || 8080);
