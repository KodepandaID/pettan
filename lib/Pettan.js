const _ = require('lodash');
const uuid = require('uuid/v4');

const file = require('./File');

class Pettan {
  collection(json) {
    if (typeof json === 'string') this.path = json;
    else {
      this.path = null;
      this.collectionData = json;
    }

    return this;
  }

  count() {
    const results = this.results;

    delete this.results;
    return results.length;
  }

  sum(key) {
    const sum = _.sumBy(this.results, (o) => _.get(o, key));

    delete this.results;
    return sum;
  }

  avg(key) {
    const avg = _.meanBy(this.results, (o) => _.get(o, key));

    delete this.results;
    return avg;
  }

  max(key) {
    const max = _.maxBy(this.results, (o) => _.get(o, key));

    delete this.results;
    return max;
  }

  min(key) {
    const min = _.minBy(this.results, (o) => _.get(o, key));

    delete this.results;
    return min;
  }

  all() {
    if (this.path !== null) this.results = file.loadFile(this.path);
    else this.results = this.collectionData;

    return this;
  }

  find(id) {
    let data = [];
    if (this.path !== null) data = file.loadFile(this.path);
    else data = this.collectionData;

    const object = _.find(data, (o) => o._id === id);

    return object;
  }

  findBy(key, value, operator = '=') {
    let data = [];
    if (this.path !== null) data = file.loadFile(this.path);
    else data = this.collectionData;

    switch (operator) {
      case '<':
        return _.filter(data, (o) => _.get(o, key) < value);
      case '>':
        return _.filter(data, (o) => _.get(o, key) > value);
      case '<=':
        return _.filter(data, (o) => _.get(o, key) <= value);
      case '>=':
        return _.filter(data, (o) => _.get(o, key) >= value);
      case '!=':
        return _.filter(data, (o) => _.get(o, key) !== value);
      case 'like':
        return _.filter(data, (o) => _.includes(_.get(o, key), value));
      case 'not like':
        return _.filter(data, (o) => !_.includes(_.get(o, key), value));
      case 'in':
        return _.filter(data, (o) => _.includes(_.get(o, key), value));
      case 'not in':
        return _.filter(data, (o) => !_.includes(_.get(o, key), value));
      case 'between':
        return _.filter(data, (o) => _.inRange(_.get(o, key), value[0], value[1]));
      case 'not between':
        return _.filter(data, (o) => !_.inRange(_.get(o, key), value[0], value[1]));
      default:
        return _.filter(data, (o) => _.get(o, key) === value);
    }
  }

  where(...args) {
    if (this.results === undefined) this.results = [];
    if (typeof args[0] === 'object') {
      const data = [];
      Object.keys(...args).forEach((key) => {
        if (data.length === 0) {
          const tmp = this.findBy(key, args[0][key]);
          data.push(tmp);
        } else {
          const tmp = this.findBy(key, args[0][key]);
          if (JSON.stringify(tmp) === JSON.stringify(data[0])) this.results.push(...tmp);
        }
      });
    } else if (args.length === 2) {
      const data = this.findBy(args[0], args[1]);
      this.results.push(...data);
    } else if (args.length === 3) {
      const data = this.findBy(args[0], args[2], args[1]);
      this.results.push(...data);
    }

    return this;
  }

  orWhere(...args) {
    this.where(...args);

    return this;
  }

  insert(object) {
    const entry = { _id: uuid(), ...object };

    let data = [];
    if (this.path !== null) data = file.loadFile(this.path);
    else data = this.collectionData;

    data.push(entry);
    if (this.path !== null) file.stored(this.path, data);
    else this.collectionData = data;

    return this;
  }

  inserts(array) {
    const entries = [];
    const entry = array.map((obj) => {
      let newObj = { _id: uuid() };
      entries.push(newObj._id);
      newObj = { ...newObj, ...obj };
      return newObj;
    });

    let data = [];
    if (this.path !== null) data = file.loadFile(this.path);
    else data = this.collectionData;

    entry.forEach((obj) => data.push(obj));
    if (this.path !== null) file.stored(this.path, data);
    else this.collectionData = data;

    return this;
  }

  update(object) {
    let data = [];
    if (this.path !== null) data = file.loadFile(this.path);
    else data = this.collectionData;

    const index = _.findIndex(data, (o) => o._id === this.results[0]._id);

    const _id = data[index]._id;
    data[index] = { _id, ...object };
    if (this.path !== null) file.stored(this.path, data);
    else this.collectionData = data;

    return this;
  }

  delete() {
    let data = [];
    if (this.path !== null) data = file.loadFile(this.path);
    else data = this.collectionData;

    const index = _.findIndex(data, (o) => o._id === this.results[0]._id);
    _.pullAt(data, index);

    if (this.path !== null) file.stored(this.path, data);
    else this.collectionData = data;

    return this;
  }

  sortBy(key, by = 'asc') {
    this.results = _.orderBy(this.results, key, by);

    return this;
  }

  limit(value) {
    this.limitValue = value;

    return this;
  }

  offset(value) {
    this.offsetValue = value;

    return this;
  }

  get(...args) {
    let results = this.results;

    if (args.length > 0) results = _.map(results, (o) => _.pick(o, [...args]));
    if (this.offsetValue !== undefined) results = _.drop(results, this.offsetValue * this.limitValue);
    if (this.limitValue !== undefined) results = _.take(results, this.limitValue);

    delete this.results;
    delete this.offsetValue;
    delete this.limitValue;

    return results;
  }

  first(...args) {
    let results = this.results;

    if (args.length > 0) results = _.map(results, (o) => _.pick(o, [...args]));

    delete this.results;
    return results[0];
  }

  pluck(key) {
    const results = this.results;

    delete this.results;
    return _.map(results, (o) => _.pick(o, [key]))[0][key];
  }
}

module.exports = new Pettan();
