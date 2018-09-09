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
});
