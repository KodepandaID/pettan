# Pettan
[![Build Status](https://travis-ci.org/KodepandaID/pettan.svg?branch=master)](https://travis-ci.org/KodepandaID/pettan)

Pettan is a flat-file JSON DBMS. You can query the JSON file like DBMS. You can filtering, sorting, limiting and use CRUD on JSON file.

Pettan created by [Yudha Pratama](https://yudhapratama.com), if you found a bug you can open the issue on Github or you can DM to my [Twitter](https://twitter.com/lordaur).

If you like these packages, please donate to support our project

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/T6T312Z2T)

# Installation
```bash
npm install pettan --save
```

# How to use
## collection()
**collection()** method used to load a JSON file. You should run this method first.
```js
const pettan = require('pettan').collection('books.json');
// or you can load array collection
const pettan = require('pettan').collection([{_id: '123'}]);
```

## find()
**find()** method used to find single record by ID.
```js
const book = pettan.find('97595cd9-c91e-481c-9344-39eaf9ce2f36');
```

## all()
**all()** method used to get all objects on JSON file.
```js
const books = pettan.all().get();
```

## get()
**get()** method used to return JSON as array.
```js
const books = pettan.all().get();
```
Or if you want to only show the specific field, by example you only want to show field **_id** and **title** only. You should use this.
```js
const books = pettan.all().get('_id', 'title');
```

## first()
**first()** method used to return JSON as an object.
```js
const books = pettan.all().first();
```
Or if you want to only show the specific field, by example you only want to show field **_id** and **title** only. You should use this.
```js
const books = pettan.all().first('_id', 'title');
```

## pluck()
**pluck()** method used to return JSON an object value.
```js
const title = pettan.all().pluck('title');
```

## count()
**count()** method used to counting data and returned total data as a number.
```js
const books = pettan.all().count();
```

## sum()
**sum()** method used to sum a specific field and returned total data as a number.
```js
const books = pettan.all().sum('views');
```

## avg()
**avg()** method used to get average from specific field and returned average data as a number.
```js
const books = pettan.all().avg('views');
```

## max
**max()** method used to get the biggest data by specific field and returned data as an object.
```js
const books = pettan.all().max('views');
```

## min
**min()** method used to get the smallest data by specific field and returned data as an object.
```js
const books = pettan.all().min('views');
```

## where
**where()** method used like where on DBMS. You can search data with specific field and value. Also, you can search data with operators, Pettan support operator like ```>```, ```>=```, ```<```, ```<=```, ```!=```, ```like```, ```not like```, ```in```, ```not in```, ```between```, ```not between```

```js
const books = pettan
  .where('title', 'Book-A').get();
```

By the way, you can search data by nested object like this:
```js
const books = pettan
  .where({
    'author.name': 'Author-A',
    status: true,
  })
```

```js
const books = pettan
  .where('views', '>', 100).get();
```

## orWhere
**orWhere()** method used like or where on DBMS. **orWhere()** function same work like **where()** method.
```js
const books = pettan
  .where('title', 'Book-A')
  .orWhere('title', 'Book-B').get();
```

## sortBy
**sortBy()** method used to sorting data by specific field and sorted by ascending or descending. To sorted ascending you can use ```asc``` and descending use ```desc```.
```js
const books = pettan
  .all()
  .sortBy('views', 'desc').get();
```

## limit
**limit()** method used to limiting data.
```js
const books = pettan
  .all()
  .limit(10).get();
```

## offset
**offset()** method used to paginate data. **offset()** method is used together with **limit()** method.
```js
const books = pettan
  .all()
  .limit(10).offset(0)
  .get();
```

## insert
**insert()** method used to added new object to the JSON file.
```js
pettan
  .insert({
    title: 'Book-1568028521',
    published_at: '2019-09-09T11:28:41.431Z',
    author: {
      name: 'Yudha Pratama',
      email: 'yudha.webdev@gmail.com',
      followers: 15,
    },
    tags: ['action', 'drama', 'fantasy'],
    views: 150,
  })
```
After the data is added to the JSON file. Automatically ```_id``` field is added to the object. ```_id``` is a UUID string.

## update
**update()** method used to edited specific object on JSON file.
```js
pettan
  .where('_id', '97595cd9-c91e-481c-9344-39eaf9ce2f36')
  .update({
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
```

## delete
**delete()** method used to removed specific object on JSON file.
```js
pettan
  .where('_id', '97595cd9-c91e-481c-9344-39eaf9ce2f36')
  .delete();
```