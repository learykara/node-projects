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

module.exports = Storage;
