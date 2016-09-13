global.DATABASE_URL = 'mongodb://localhost/shopping-list-test'

const chai = require('chai')
const chaiHttp = require('chai-http')

const { app, runServer } = require('../server.js')
const Item = require('../models/item')

const should = chai.should()

const FIRST_ITEM = 'Broad beans'
const SECOND_ITEM = 'Tomatoes'
const THIRD_ITEM = 'Peppers'

chai.use(chaiHttp)

describe('Shopping list', () => {

  // Nested `describe`s
  // describe('on get', () => {
  //   it('should list items on get')
  //   it('should get a 404 if item does not exist')
  // })

  beforeEach((done) => {
    runServer(() => {
      Item.create(
        { name: FIRST_ITEM },
        { name: SECOND_ITEM },
        { name: THIRD_ITEM }, () => {
          done()
        })
    })
  })

  afterEach((done) => {
    Item.remove(() => done())
  })

  it('should list items on get', (done) => {
    chai.request(app).
      get('/items').
      end((err, res) => {
        res.should.have.status(200)
        res.should.be.json
        res.body.should.be.a('array')
        const firstItem = res.body[0]
        firstItem.should.be.a('object')
        firstItem.should.have.property('_id')
        firstItem.should.have.property('name')
        firstItem._id.should.be.a('string')
        firstItem.name.should.be.a('string')
        firstItem.name.should.equal(FIRST_ITEM)
        res.body[1].name.should.equal(SECOND_ITEM)
        done()
      })
  })

  it('should add an item on post', (done) => {
    chai.request(app).
      post('/items').
      send({name: 'Kale'}).
      end((err, res) => {
        should.equal(err, null)
        res.should.have.status(201)
        res.should.be.json
        res.body.should.be.a('object')
        res.body.should.have.property('name')
        res.body.should.have.property('_id')
        res.body.name.should.be.a('string')
        res.body._id.should.be.a('string')
        res.body.name.should.equal('Kale')

        Item.count({}, (countErr, count) => {
          chai.expect(count).to.equal(4)
        })

        Item.findById(res.body._id, (err, item) => {
          item.should.be.a('object')
          item.should.have.property('_id')
          item.should.have.property('name')
          item.name.should.be.a('string')
          item.name.should.equal('Kale')
          done()
        })
      })
  })

  it('should edit an item on put', (done) => {
    Item.findOne({ name: FIRST_ITEM }, (err, item) => {
      chai.request(app).
        put(`/items/${item._id}`).
        send({name: 'New item'}).
        end((err, res) => {
          should.equal(err, null)
          res.should.have.status(200)
          res.should.be.json
          res.body.should.be.a('object')
          res.body.should.have.property('name')
          res.body.should.have.property('_id')
          res.body.name.should.be.a('string')
          res.body._id.should.be.a('string')
          res.body.name.should.equal('New item')

          Item.count({}, (countErr, count) => {
            chai.expect(count).to.equal(3)
          })

          Item.findById(item._id, (err, newItem) => {
            newItem.should.be.a('object')
            newItem.should.have.property('_id')
            newItem.should.have.property('name')
            newItem.name.should.be.a('string')
            newItem.name.should.equal('New item')
            done()
          })
        })
    })
  })

  it('should delete an item on delete', (done) => {
    Item.findOne({ name: THIRD_ITEM }, (err, item) => {
      const itemId = item._id
      chai.request(app).
        del(`/items/${itemId}`).
        end((err, res) => {
          should.equal(err, null)
          res.should.have.status(204)

          Item.count({}, (countErr, count) => {
            chai.expect(count).to.equal(2)
          })

          Item.findById(itemId, (findErr, newItem) => {
            should.not.exist(newItem)
            done()
          })
        })
      })
  })
})
