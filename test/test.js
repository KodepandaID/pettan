const chai = require('chai');
const pettan = require('../index').collection(`${__dirname}/assets/books.json`);

chai.should();

let bookId = null;

describe('Pettan Unit Testing', () => {
  it('function all() with get()', (done) => {
    const results = pettan.all().get();

    results.should.be.a('array');
    results.should.have.lengthOf(2);

    chai.expect(results[0]).to.deep.equal({
      _id: '97595cd9-c91e-481c-9344-39eaf9ce2f36',
      title: 'Book-1568028521',
      published_at: '2019-09-09T11:28:41.431Z',
      author: {
        name: 'Yudha Pratama',
        email: 'yudha.webdev@gmail.com',
        followers: 15,
      },
      tags: ['action', 'drama', 'fantasy'],
      views: 150,
    });

    done();
  });

  it('function all() with get() and specific fields', (done) => {
    const results = pettan.all().get('_id', 'title');

    results.should.be.a('array');
    results.should.have.lengthOf(2);

    chai.expect(results[0]).to.deep.equal({
      _id: '97595cd9-c91e-481c-9344-39eaf9ce2f36',
      title: 'Book-1568028521',
    });

    done();
  });

  it('function all() with first()', (done) => {
    const results = pettan.all().first();

    results.should.be.a('object');

    chai.expect(results).to.deep.equal({
      _id: '97595cd9-c91e-481c-9344-39eaf9ce2f36',
      title: 'Book-1568028521',
      published_at: '2019-09-09T11:28:41.431Z',
      author: {
        name: 'Yudha Pratama',
        email: 'yudha.webdev@gmail.com',
        followers: 15,
      },
      tags: ['action', 'drama', 'fantasy'],
      views: 150,
    });

    done();
  });

  it('function all() with first() and specific fields', (done) => {
    const results = pettan.all().first('_id', 'title');

    results.should.be.a('object');

    chai.expect(results).to.deep.equal({
      _id: '97595cd9-c91e-481c-9344-39eaf9ce2f36',
      title: 'Book-1568028521',
    });

    done();
  });

  it('function sortBy()', (done) => {
    const results = pettan.all().sortBy('author.followers', 'desc').get('_id', 'title');

    results.should.be.a('array');
    results.should.have.lengthOf(2);

    chai.expect(results[0]).to.deep.equal({
      _id: '81995sz9-c71e-983c-2334-19azf9de2f46',
      title: 'BookHorror',
    });

    done();
  });

  it('function limit()', (done) => {
    const results = pettan.all().limit(1).get();

    results.should.be.a('array');
    results.should.have.lengthOf(1);

    chai.expect(results[0]).to.deep.equal({
      _id: '97595cd9-c91e-481c-9344-39eaf9ce2f36',
      title: 'Book-1568028521',
      published_at: '2019-09-09T11:28:41.431Z',
      author: {
        name: 'Yudha Pratama',
        email: 'yudha.webdev@gmail.com',
        followers: 15,
      },
      tags: ['action', 'drama', 'fantasy'],
      views: 150,
    });

    done();
  });

  it('function offset()', (done) => {
    const results = pettan.all().limit(1).offset(0).get();

    results.should.be.a('array');
    results.should.have.lengthOf(1);

    chai.expect(results[0]).to.deep.equal({
      _id: '97595cd9-c91e-481c-9344-39eaf9ce2f36',
      title: 'Book-1568028521',
      published_at: '2019-09-09T11:28:41.431Z',
      author: {
        name: 'Yudha Pratama',
        email: 'yudha.webdev@gmail.com',
        followers: 15,
      },
      tags: ['action', 'drama', 'fantasy'],
      views: 150,
    });

    done();
  });

  it('function count()', (done) => {
    const results = pettan.all().count();

    results.should.be.a('number');

    chai.assert.equal(results, 2);

    done();
  });

  it('function sum()', (done) => {
    const results = pettan.all().sum('views');

    results.should.be.a('number');

    chai.assert.equal(results, 406);

    done();
  });

  it('function avg()', (done) => {
    const results = pettan.all().avg('views');

    results.should.be.a('number');

    chai.assert.equal(results, 203);

    done();
  });

  it('function min()', (done) => {
    const results = pettan.all().min('views');

    results.should.be.a('object');

    chai.expect(results).to.deep.equal({
      _id: '97595cd9-c91e-481c-9344-39eaf9ce2f36',
      title: 'Book-1568028521',
      published_at: '2019-09-09T11:28:41.431Z',
      author: {
        name: 'Yudha Pratama',
        email: 'yudha.webdev@gmail.com',
        followers: 15,
      },
      tags: ['action', 'drama', 'fantasy'],
      views: 150,
    });

    done();
  });

  it('function max()', (done) => {
    const results = pettan.all().max('views');

    results.should.be.a('object');

    chai.expect(results).to.deep.equal({
      _id: '81995sz9-c71e-983c-2334-19azf9de2f46',
      title: 'BookHorror',
      published_at: '2019-09-09T11:28:41.431Z',
      author: {
        name: 'Jon',
        email: 'jon@mail.com',
        followers: 156,
      },
      tags: ['horror', 'fantasy'],
      views: 256,
    });

    done();
  });

  it('function find()', (done) => {
    const results = pettan.find('97595cd9-c91e-481c-9344-39eaf9ce2f36');

    results.should.be.a('object');

    chai.expect(results).to.deep.equal({
      _id: '97595cd9-c91e-481c-9344-39eaf9ce2f36',
      title: 'Book-1568028521',
      published_at: '2019-09-09T11:28:41.431Z',
      author: {
        name: 'Yudha Pratama',
        email: 'yudha.webdev@gmail.com',
        followers: 15,
      },
      tags: ['action', 'drama', 'fantasy'],
      views: 150,
    });

    done();
  });

  it('function pluck()', (done) => {
    const results = pettan.where('_id', '97595cd9-c91e-481c-9344-39eaf9ce2f36').pluck('_id');

    results.should.be.a('string');
    chai.expect(results).equal('97595cd9-c91e-481c-9344-39eaf9ce2f36');

    done();
  });

  it('function where()', (done) => {
    const results = pettan.where('_id', '97595cd9-c91e-481c-9344-39eaf9ce2f36').get();

    results.should.be.a('array');
    results.should.have.lengthOf(1);

    chai.expect(results).to.deep.equal([{
      _id: '97595cd9-c91e-481c-9344-39eaf9ce2f36',
      title: 'Book-1568028521',
      published_at: '2019-09-09T11:28:41.431Z',
      author: {
        name: 'Yudha Pratama',
        email: 'yudha.webdev@gmail.com',
        followers: 15,
      },
      tags: ['action', 'drama', 'fantasy'],
      views: 150,
    }]);

    done();
  });

  it('function where() with operator >', (done) => {
    const results = pettan.where('views', '>', 150).get();

    results.should.be.a('array');
    results.should.have.lengthOf(1);

    chai.expect(results).to.deep.equal([{
      _id: '81995sz9-c71e-983c-2334-19azf9de2f46',
      title: 'BookHorror',
      published_at: '2019-09-09T11:28:41.431Z',
      author: {
        name: 'Jon',
        email: 'jon@mail.com',
        followers: 156,
      },
      tags: ['horror', 'fantasy'],
      views: 256,
    }]);

    done();
  });

  it('function where() with operator >=', (done) => {
    const results = pettan.where('views', '>=', 150).get();

    results.should.be.a('array');
    results.should.have.lengthOf(2);

    chai.expect(results[0]).to.deep.equal({
      _id: '97595cd9-c91e-481c-9344-39eaf9ce2f36',
      title: 'Book-1568028521',
      published_at: '2019-09-09T11:28:41.431Z',
      author: {
        name: 'Yudha Pratama',
        email: 'yudha.webdev@gmail.com',
        followers: 15,
      },
      tags: ['action', 'drama', 'fantasy'],
      views: 150,
    });

    done();
  });

  it('function where() with operator <', (done) => {
    const results = pettan.where('views', '<', 256).get();

    results.should.be.a('array');
    results.should.have.lengthOf(1);

    chai.expect(results).to.deep.equal([{
      _id: '97595cd9-c91e-481c-9344-39eaf9ce2f36',
      title: 'Book-1568028521',
      published_at: '2019-09-09T11:28:41.431Z',
      author: {
        name: 'Yudha Pratama',
        email: 'yudha.webdev@gmail.com',
        followers: 15,
      },
      tags: ['action', 'drama', 'fantasy'],
      views: 150,
    }]);

    done();
  });

  it('function where() with operator <=', (done) => {
    const results = pettan.where('views', '<=', 256).get();

    results.should.be.a('array');
    results.should.have.lengthOf(2);

    chai.expect(results[1]).to.deep.equal({
      _id: '81995sz9-c71e-983c-2334-19azf9de2f46',
      title: 'BookHorror',
      published_at: '2019-09-09T11:28:41.431Z',
      author: {
        name: 'Jon',
        email: 'jon@mail.com',
        followers: 156,
      },
      tags: ['horror', 'fantasy'],
      views: 256,
    });

    done();
  });

  it('function where() with operator !=', (done) => {
    const results = pettan.where('views', '!=', 150).get();

    results.should.be.a('array');
    results.should.have.lengthOf(1);

    chai.expect(results).to.deep.equal([{
      _id: '81995sz9-c71e-983c-2334-19azf9de2f46',
      title: 'BookHorror',
      published_at: '2019-09-09T11:28:41.431Z',
      author: {
        name: 'Jon',
        email: 'jon@mail.com',
        followers: 156,
      },
      tags: ['horror', 'fantasy'],
      views: 256,
    }]);

    done();
  });

  it('function where() with operator like', (done) => {
    const results = pettan.where('author.name', 'like', 'Yudha').get();

    results.should.be.a('array');
    results.should.have.lengthOf(1);

    chai.expect(results).to.deep.equal([{
      _id: '97595cd9-c91e-481c-9344-39eaf9ce2f36',
      title: 'Book-1568028521',
      published_at: '2019-09-09T11:28:41.431Z',
      author: {
        name: 'Yudha Pratama',
        email: 'yudha.webdev@gmail.com',
        followers: 15,
      },
      tags: ['action', 'drama', 'fantasy'],
      views: 150,
    }]);

    done();
  });

  it('function where() with operator not like', (done) => {
    const results = pettan.where('author.name', 'not like', 'Jon').get();

    results.should.be.a('array');
    results.should.have.lengthOf(1);

    chai.expect(results).to.deep.equal([{
      _id: '97595cd9-c91e-481c-9344-39eaf9ce2f36',
      title: 'Book-1568028521',
      published_at: '2019-09-09T11:28:41.431Z',
      author: {
        name: 'Yudha Pratama',
        email: 'yudha.webdev@gmail.com',
        followers: 15,
      },
      tags: ['action', 'drama', 'fantasy'],
      views: 150,
    }]);

    done();
  });

  it('function where() with operator in', (done) => {
    const results = pettan.where('tags', 'in', 'action').get();

    results.should.be.a('array');
    results.should.have.lengthOf(1);

    chai.expect(results).to.deep.equal([{
      _id: '97595cd9-c91e-481c-9344-39eaf9ce2f36',
      title: 'Book-1568028521',
      published_at: '2019-09-09T11:28:41.431Z',
      author: {
        name: 'Yudha Pratama',
        email: 'yudha.webdev@gmail.com',
        followers: 15,
      },
      tags: ['action', 'drama', 'fantasy'],
      views: 150,
    }]);

    done();
  });

  it('function where() with operator not in', (done) => {
    const results = pettan.where('tags', 'not in', 'action').get();

    results.should.be.a('array');
    results.should.have.lengthOf(1);

    chai.expect(results).to.deep.equal([{
      _id: '81995sz9-c71e-983c-2334-19azf9de2f46',
      title: 'BookHorror',
      published_at: '2019-09-09T11:28:41.431Z',
      author: {
        name: 'Jon',
        email: 'jon@mail.com',
        followers: 156,
      },
      tags: ['horror', 'fantasy'],
      views: 256,
    }]);

    done();
  });

  it('function where() with operator between', (done) => {
    const results = pettan.where('author.followers', 'between', [100, 250]).get();

    results.should.be.a('array');
    results.should.have.lengthOf(1);

    chai.expect(results).to.deep.equal([{
      _id: '81995sz9-c71e-983c-2334-19azf9de2f46',
      title: 'BookHorror',
      published_at: '2019-09-09T11:28:41.431Z',
      author: {
        name: 'Jon',
        email: 'jon@mail.com',
        followers: 156,
      },
      tags: ['horror', 'fantasy'],
      views: 256,
    }]);

    done();
  });

  it('function where() with operator not between', (done) => {
    const results = pettan.where('author.followers', 'not between', [100, 250]).get();

    results.should.be.a('array');
    results.should.have.lengthOf(1);

    chai.expect(results).to.deep.equal([{
      _id: '97595cd9-c91e-481c-9344-39eaf9ce2f36',
      title: 'Book-1568028521',
      published_at: '2019-09-09T11:28:41.431Z',
      author: {
        name: 'Yudha Pratama',
        email: 'yudha.webdev@gmail.com',
        followers: 15,
      },
      tags: ['action', 'drama', 'fantasy'],
      views: 150,
    }]);

    done();
  });

  it('function where() with many field', (done) => {
    const results = pettan.where({
      'author.name': 'Yudha Pratama',
      'author.email': 'yudha.webdev@gmail.com',
    }).get();

    results.should.be.a('array');
    results.should.have.lengthOf(1);

    chai.expect(results).to.deep.equal([{
      _id: '97595cd9-c91e-481c-9344-39eaf9ce2f36',
      title: 'Book-1568028521',
      published_at: '2019-09-09T11:28:41.431Z',
      author: {
        name: 'Yudha Pratama',
        email: 'yudha.webdev@gmail.com',
        followers: 15,
      },
      tags: ['action', 'drama', 'fantasy'],
      views: 150,
    }]);

    done();
  });

  it('function orWhere()', (done) => {
    const results = pettan
      .where('_id', '97595cd9-c91e-481c-9344-39eaf9ce2f36')
      .orWhere('_id', '81995sz9-c71e-983c-2334-19azf9de2f46').get();

    results.should.be.a('array');
    results.should.have.lengthOf(2);

    chai.expect(results[0]).to.deep.equal({
      _id: '97595cd9-c91e-481c-9344-39eaf9ce2f36',
      title: 'Book-1568028521',
      published_at: '2019-09-09T11:28:41.431Z',
      author: {
        name: 'Yudha Pratama',
        email: 'yudha.webdev@gmail.com',
        followers: 15,
      },
      tags: ['action', 'drama', 'fantasy'],
      views: 150,
    });

    done();
  });

  it('function insert()', (done) => {
    const results = pettan.insert({
      title: 'Book-A',
      published_at: '2019-09-09T11:28:41.431Z',
      author: {
        name: 'Yudha Pratama',
        email: 'yudha.webdev@gmail.com',
        followers: 15,
      },
      tags: ['mistery'],
      views: 10,
    });

    results.should.be.a('object');
    const books = pettan.all().get('_id');
    bookId = books[books.length - 1]._id;

    done();
  });

  it('function update()', (done) => {
    pettan
      .where('_id', bookId)
      .update({
        title: 'Book-AA',
        published_at: '2019-09-09T11:28:41.431Z',
        author: {
          name: 'Yudha Pratama',
          email: 'yudha.webdev@gmail.com',
          followers: 15,
        },
        tags: ['mistery'],
        views: 10,
      });

    done();
  });

  it('function delete()', (done) => {
    pettan
      .where('_id', bookId)
      .delete();

    done();
  });

  it('function inserts()', (done) => {
    const results = pettan.inserts([{
      title: 'Book-A',
      published_at: '2019-09-09T11:28:41.431Z',
      author: {
        name: 'Yudha Pratama',
        email: 'yudha.webdev@gmail.com',
        followers: 15,
      },
      tags: ['mistery'],
      views: 10,
    }]);

    results.should.be.a('object');
    const books = pettan.all().get('_id');
    bookId = books[books.length - 1]._id;

    done();
  });

  it('function delete()', (done) => {
    pettan
      .where('_id', bookId)
      .delete();

    done();
  });
});
