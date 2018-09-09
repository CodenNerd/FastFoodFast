import request from 'supertest';
import { expect } from 'chai';

import app from '../app';
import { length } from '../data/orders';

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
          expect(length).to.equal(res.body.length).to.equal(4);
          expect(res.body).to.be.a('array');
          if (err) return done(err);
          return done();
        });
    });
  });
  describe('GET /order', () => {
    it('should get a single order', (done) => {
      request(app).get('/api/v1/orders/3')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('food').with.lengthOf(1);
          expect(res.body.food).to.be.a('array');
          if (err) return done(err);
          return done();
        });
    });

    it('should not get an order', (done) => {
      request(app).get('/api/v1/orders/9')
        .expect('Content-Type', /text\/html/)
        .expect(404)
        .expect(/That particular order was not found/, done);
    });
  });
  describe('POST /orders', () => {
    it('should create a new order', (done) => {
      request(app).post('api/v1/orders')
        .send({
          userId: 7,
          food: ['cake'],
        })
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body).to.have.property('food').with.lengthOf(1);
          expect(res.body).to.have.property('userId').with.lengthOf(1);

          if (err) return done(err);
          return done();
        });
    });
  });

  describe('PUT /an order', () => {
    it('should update an order', (done) => {
      request(app).put('/api/v1/orders/3')
        .send({
          food: ['bread'],
          foodstatus: 'pending',
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('food').with.lengthOf(1);
          expect(res.body.foodstatus).to.equal('pending');
          if (err) return done(err);
          return done();
        });
    });
  });
});
