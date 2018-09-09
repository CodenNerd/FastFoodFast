const request = require('supertest');
const { expect } = require('chai');

const app = require('../app');
const orders = require('../data/orders');

describe('FastFoodFast', () => {
  describe('homepage', () => {
    it('welcomes the user', (done) => {
      request(app).get('/')
        .expect(200)
        .expect(/Welcome to FastFoodFast/, done);
    });
  });
  describe('GET /orders ', () => {
    it('should get all orders', (done) => {
      request(app).get('/api/v1/orders')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(orders.length).to.equal(res.body.length).to.equal(4);
          expect(res.body).to.be.a('array');
          if (err) return done(err);
          return done();
        });
    });
  });
});
