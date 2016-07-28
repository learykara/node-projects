const bodyParser = require('body-parser');
const express = require('express');

const { Storage } = require('./storage');

const router = express.Router();
const jsonParser = bodyParser.json();

const storage = new Storage();

router.get('/items', (req, res) => {
  res.json(storage.items);
});

router.post('/items', jsonParser, (req, res) => {
  if (!req.body) {
    return res.sendStatus(400);
  }

  const item = storage.add(req.body.name);
  res.status(201).json(item);
});

router.delete('/items/:id', (req, res) => {
  storage.delete(parseInt(req.params.id));
  return res.sendStatus(204);
});

router.put('/items/:id', jsonParser, (req, res) => {
  if (!req.body) {
    return res.sendStatus(400);
  }
  let item;
  try {
    item = storage.upsert(req.body.name, parseInt(req.params.id));
  } catch (err) {
    console.error('Item ID must be an integer.');
    res.sendStatus(400);
  }
  return res.status(200).json(item);
});

exports.router = router;
exports.storage = storage;
