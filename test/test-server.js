const _ = require('lodash');
const chai = require('chai');
const chaiHttp = require('chai-http');

const { app } = require('../server.js');
const { storage } = require('../routes.js');

const FIRST_ITEM = 'Broad beans';
const SECOND_ITEM = 'Tomatoes';

storage.add(FIRST_ITEM);
storage.add(SECOND_ITEM);

const should = chai.should();

chai.use(chaiHttp);

describe('Shopping List', function() {
  it('should list items on get', (done) => {
    chai.request(app).
      get('/items').
      end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        const firstItem = res.body[0];
        firstItem.should.be.a('object');
        firstItem.should.have.property('id');
        firstItem.should.have.property('name');
        firstItem.id.should.be.a('number');
        firstItem.name.should.be.a('string');
        firstItem.name.should.equal(FIRST_ITEM);
        res.body[1].name.should.equal(SECOND_ITEM);
        done();
      });
  });

  it('should add an item on post', (done) => {
    chai.request(app).
      post('/items').
      send({name: 'Kale'}).
      end((err, res) => {
        should.equal(err, null);
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.should.have.property('id');
        res.body.name.should.be.a('string');
        res.body.id.should.be.a('number');
        res.body.name.should.equal('Kale');
        storage.items.should.be.a('array');
        storage.items.should.have.length(3);
        var newItem = storage.items[2];
        newItem.should.be.a('object');
        newItem.should.have.property('id');
        newItem.should.have.property('name');
        newItem.id.should.be.a('number');
        newItem.name.should.be.a('string');
        newItem.name.should.equal('Kale');
        done();
      });
  });

  it('should edit an item on put', (done) => {
    const storageLen = storage.items.length;
    chai.request(app).
      put(`/items/${storage.items[0].id}`).
      send({name: 'New item'}).
      end((err, res) => {
        should.equal(err, null);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.should.have.property('id');
        res.body.name.should.be.a('string');
        res.body.id.should.be.a('number');
        res.body.name.should.equal('New item');
        storage.items.should.be.a('array');
        storage.items.should.have.length(storageLen);
        var updatedItem = storage.items[0];
        updatedItem.should.be.a('object');
        updatedItem.should.have.property('id');
        updatedItem.should.have.property('name');
        updatedItem.id.should.be.a('number');
        updatedItem.name.should.be.a('string');
        updatedItem.name.should.equal('New item');
        done();
      })
  });

  it('should create an item on put if none exits', (done) => {
    const storageLen = storage.items.length;
    chai.request(app).
      put('/items/1337').
      send({name: 'Newer item'}).
      end((err, res) => {
        should.equal(err, null);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.should.have.property('id');
        res.body.name.should.be.a('string');
        res.body.id.should.be.a('number');
        res.body.name.should.equal('Newer item');
        storage.items.should.be.a('array');
        storage.items.should.have.length(storageLen + 1);
        var updatedItem = storage.items[storageLen];
        updatedItem.should.be.a('object');
        updatedItem.should.have.property('id');
        updatedItem.should.have.property('name');
        updatedItem.id.should.be.a('number');
        updatedItem.name.should.be.a('string');
        updatedItem.name.should.equal('Newer item');
        done();
      })
  })

  it('should delete an item on delete', (done) => {
    const storageLen = storage.items.length;
    const idToDelete = storage.items[0].id;
    chai.request(app).
      del(`/items/${idToDelete}`).
      end((err, res) => {
        should.equal(err, null);
        res.should.have.status(204);
        storage.items.should.be.a('array');
        storage.items.should.have.length(storageLen - 1);
        item = _.find(storage.items, {id: idToDelete});
        should.not.exist(item);
        done();
      });
  });
});
