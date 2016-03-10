/* jslint node: true */

// Load configuration

var env = process.env.NODE_ENV || 'development',
    config = require('../../../server/config/config.js')[env],
    localConfig = require('./../../config-test.json');

var should = require('should'),
    supertest = require('supertest');

describe('Api routing for CRUD operations on books', function () {
    "use strict";
    var request = supertest(localConfig.host + ":" + config.port + "/" + localConfig.api_path);

    var tmpBookId = null;
    var tmpBookResponse;

    before(function (done) {
        done();
    });

    // Creating  a book document
    describe('Create Book', function() {
        it('Should POST /books', function (done) {
            request
                .post('/books')
                .send({
                    "title": "Great Book" + Date.now(),
                    "author": "John Doe",
                    "Description": "Lorem Ipsum Dolor Sit Amet"
                })
                .expect(200)
           //   .expect('Content-Type', /application.json/)
            //  .expect('Content-Type', 'utf-8')
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    JSON.parse(res.text)
                        .should.have.property('meta')
                        .and.have.property('action').be.exactly('create');
                    JSON.parse(res.text)
                        .should.have.property('err').be.exactly(null);
                    res.statusCode.should.be.exactly(200);
                    res.type.should.be.exactly('application/json');
                    res.charset.should.be.exactly('utf-8');

                    tmpBookId = JSON.parse(res.text).doc._id;
                    done();
                });
       });
    });
    // retrieving all book documents
    describe('RETRIEVE all books', function () {
        "use strict";
        it('Should get all /books', function (done) {
            request
                .get('/books')
                .expect(200)
            //  .expect('Content-type', /application.json/)
            //  .expect('Content-Type', 'utf-8')
                .end(function (err, res){
                    if (err) {
                        throw err;
                    }

                    JSON.parse(res.text)
                        .should.have.property('meta')
                        .and.have.property('action').be.exactly('list');
                    res.statusCode.should.be.exactly(200);

                    tmpBookResponse = res.text;
                    done();
                });
        });
    });

    // retrieving ONE book document
    describe('Retrieve 1 book', function () {
        it('Should GET /books/{id}', function (done) {
            request
                .get('/books/' + tmpBookId)
            //  .expect('Content-Type', /application.json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    JSON.parse(res.text)
                        .should.have.property('meta')
                        .and.have.property('action').be.exacctly('detail');
                        res.statusCode.should.be.exactly(200);
                    done();
                });
        });
    });

    // update 1 book
    describe('Update 1 book', function () {
        "use strict";
        it('Should PUT /books/{id}', function (done) {
            request
                .put('/books' + tmpBookId)
                .send({
                    "doc": {
                        "title": "Good book" + Date.now(),
                        "author": "MPR de Roos",
                        "description": "Updated this book"
                    }
                })
                .expect(200)
         //     .expect('Content-type', /application.json/)
          //    .expect('Content-Type', 'utf-8')
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    JSON.parse(res.text)
                        .should.have.property('meta')
                        .and.have.property('action').be.exactly('update');
                    JSON.parse(res.text)
                        .should.have.property('err').be.exactly(null);
                    res.statusCode.should.be.exactly(200);
                    done();
                });
        });
    });

    //delete a book

    describe('delete 1 book', function () {
        it('Should delete /books/{id}', function (done) {
            request
                .del('/books/' + tmpBookId)
           //   .expect('Content-type', /application.json/)
           //     .expect('Content-Type', 'utf-8')
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    JSON.parse(res.text)
                        .should.have.property('meta')
                        .and.have.property('action').be.exactly('delete');
                    res.statusCode.should.be.exactly(200);
                    done();
              });
        });
    });
});


