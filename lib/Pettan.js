const _ = require('lodash');
const uuid = require('uuid/v4');

const file = require('./File');

class Pettan {
  collection(path) {
    this.path = path;

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
    this.results = file.loadFile(this.path);

    return this;
  }

  find(id) {
    const data = file.loadFile(this.path);
    const object = _.find(data, (o) => o._id === id);

    return object;
  }

  findBy(key, value, operator = '=') {
    const data = file.loadFile(this.path);

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
    let entry = { _id: uuid() };
    entry = { ...entry, ...object };

    const data = file.loadFile(this.path);
    data.push(entry);
    file.stored(this.path, data);

    return this;
  }

  inserts(array) {
    const entry = array.map((obj) => {
      let newObj = { _id: uuid() };
      newObj = { ...newObj, ...obj };
      return newObj;
    });

    const data = file.loadFile(this.path);
    entry.forEach((obj) => data.push(obj));
    file.stored(this.path, data);

    return this;
  }

  update(object) {
    const data = file.loadFile(this.path);
    const index = _.findIndex(data, (o) => o._id === this.results[0]._id);

    data[index] = object;
    file.stored(this.path, data);

    return this;
  }

  delete() {
    const data = file.loadFile(this.path);
    const index = _.findIndex(data, (o) => o._id === this.results[0]._id);

    _.pullAt(data, index);
    file.stored(this.path, data);

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

    if (args.length > 0) return _.map(results, (o) => _.pick(o, [...args]));
    if (this.offsetValue !== undefined) results = _.drop(results, this.offsetValue * this.limitValue);
    if (this.limitValue !== undefined) results = _.take(results, this.limitValue);

    delete this.results;
    delete this.offsetValue;
    delete this.limitValue;

    return results;
  }

  first(...args) {
    const results = this.results;

    if (args.length > 0) return _.map(results, (o) => _.pick(o, [...args]))[0];

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
