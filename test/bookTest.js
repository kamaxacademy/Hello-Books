import supertest from 'supertest';
import should from 'should';
import mocha from 'mocha';
import dotenv from 'dotenv';
import app from '../server';
import models from '../server/models/';
import bookSeeder from '../server/seeders/books';

dotenv.load();

const server = supertest.agent(app);
const token = process.env.testToken;
const { notAdmin } = process.env;

before((done) => {
  models.sequelize.sync({ force: true }).then(() => {
    done(null);
  }).catch((errors) => {
    done(errors);
  });
});

describe('#Book Features: ', () => {
  it(`Should display You do not have permission to perform that operation
    when a non-admin user tries to add a book`, (done) => {
      server
        .post('/api/v1/books')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .set('x-access-token', notAdmin)
        .type('form')
        .send(bookSeeder.validBook)
        .expect(403)
        .end((err, res) => {
          res.status.should.equal(403);
          res.body
            .message
            .should.equal('You do not have permission to perform that operation');
          done();
        });
    });

  it(`Should display Access denied, Authentication token does not exist
  When there is no token passed to the authenticated endpoint`, (done) => {
      server
        .post('/api/v1/books')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send(bookSeeder.validBook)
        .expect(401)
        .end((err, res) => {
          res.status.should.equal(401);
          res.body
            .message
            .should.equal('Access denied, Authentication token does not exist');
          done();
        });
    });

  it('Should add a new book', (done) => {
    server
      .post('/api/v1/books')
      .set('Connection', 'keep alive')
      .set('x-access-token', token)
      .set('Content-Type', 'application/json')
      .type('form')
      .send(bookSeeder.validBook)
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.message.should.equal('Book uploaded successfully');
        done();
      });
  });

  it(`Should display 'Book title is required' when book title 
  is not supplied to the Add Book route`, (done) => {
      server
        .post('/api/v1/books')
        .set('Connection', 'keep alive')
        .set('x-access-token', token)
        .set('Content-Type', 'application/json')
        .type('form')
        .send(bookSeeder.noBookTitle)
        .expect(409)
        .end((err, res) => {
          res.status.should.equal(409);
          res.body.message.should.equal('Book title is required');
          done();
        });
    });


  it(`Should display 'ISBN is required' when book isbn 
  is not supplied to the Add Book route`, (done) => {
      server
        .post('/api/v1/books')
        .set('Connection', 'keep alive')
        .set('x-access-token', token)
        .set('Content-Type', 'application/json')
        .type('form')
        .send(bookSeeder.noIsbn)
        .expect(409)
        .end((err, res) => {
          res.status.should.equal(409);
          res.body.message.should.equal('ISBN is required');
          done();
        });
    });

  it(`Should display 'Please add book category' when category id 
  is not supplied to the Add Book route`, (done) => {
      server
        .post('/api/v1/books')
        .set('Connection', 'keep alive')
        .set('x-access-token', token)
        .set('Content-Type', 'application/json')
        .type('form')
        .send(bookSeeder.noCatId)
        .expect(409)
        .end((err, res) => {
          res.status.should.equal(409);
          res.body.message.should.equal('Please add book category');
          done();
        });
    });

  it(`Should display 'Production Year is required' when Production year 
  is not supplied to the Add Book route`, (done) => {
      server
        .post('/api/v1/books')
        .set('Connection', 'keep alive')
        .set('x-access-token', token)
        .set('Content-Type', 'application/json')
        .type('form')
        .send(bookSeeder.noProdYear)
        .expect(409)
        .end((err, res) => {
          res.status.should.equal(409);
          res.body.message.should.equal('Production Year is required');
          done();
        });
    });

  it(`Should display 'Please upload a valid book cover' when book cover 
  is not supplied to the Add Book route`, (done) => {
      server
        .post('/api/v1/books')
        .set('Connection', 'keep alive')
        .set('x-access-token', token)
        .set('Content-Type', 'application/json')
        .type('form')
        .send(bookSeeder.noCover)
        .expect(409)
        .end((err, res) => {
          res.status.should.equal(409);
          res.body.message.should.equal('Please upload a valid book cover');
          done();
        });
    });

  it(`Should display 'Please add book author' when book author 
  is not supplied to the Add Book route`, (done) => {
      server
        .post('/api/v1/books')
        .set('Connection', 'keep alive')
        .set('x-access-token', token)
        .set('Content-Type', 'application/json')
        .type('form')
        .send(bookSeeder.noAuthor)
        .expect(409)
        .end((err, res) => {
          res.status.should.equal(409);
          res.body.message.should.equal('Please add book author');
          done();
        });
    });
});
