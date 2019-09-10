const chai = require('chai');
const pettan = require('../index').collection(`${__dirname}/assets/books.json`);

chai.should();

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
});
