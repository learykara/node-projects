const _ = require('lodash');

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
    let item = {name: name, id: id};
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
    return _.find(this.items, {id: id});
  }

  upsert(name, id) {
    const toUpdate = this.find(id);
    let item;
    if (!toUpdate) {
      item = this.add(name, id);
    } else {
      item = this.update(name, id);
    }
    return item;
  }
}

exports.Storage = Storage;
