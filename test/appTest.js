import request from 'supertest';
import { expect } from 'chai';
import app from '../server/app';
import orders from '../server/data/orders';

if (process.env.TYPE !== 'db') {
  describe('FastFoodFast', () => {
    describe('GET /', () => {
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
    describe('GET /order', () => {
      it('should get a single order', (done) => {
        request(app).get('/api/v1/orders/3')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.have.property('food');
            expect(res.body.food).to.be.a('object');
            if (err) return done(err);
            return done();
          });
      });

      it('should not get an order if the order is not existing', (done) => {
        request(app).get('/api/v1/orders/9')
          .expect('Content-Type', /json/)
          .expect(404)
          .expect(/That particular order was not found/, done);
      });
    });
    describe('POST /orders', () => {
      it('should create a new order', (done) => {
        const newOrder = {
          userId: 5,
          food: {
            foodname: 'amala',
            quantity: 4,
            price: 3,
          },
        };
        request(app).post('/api/v1/orders')
          .send(newOrder)
          .expect('Content-Type', /json/)
          .expect(201)
          .end((err, res) => {
            expect(res.body).to.have.property('food');
            expect(res.body).to.have.property('userId');

            if (err) return done(err);
            return done();
          });
      });
    });

    describe('PUT /an order', () => {
      it('should update an order', (done) => {
        const orderUpdate = {
          food: {
            foodname: 'rice',
            quantity: 6,
            price: 400.00,
          },
          foodstatus: 'delivered',
        };
        request(app).put('/api/v1/orders/3')
          .send(orderUpdate)
          .expect('Content-Type', /json/)
          .expect(202)
          .end((err, res) => {
            expect(res.body).to.have.property('food');
            expect(res.body.food).to.have.property('foodname');
            expect(res.body.food).to.have.property('quantity');
            expect(res.body.food).to.have.property('price');
            expect(res.body.foodstatus).to.equal('delivered');
            if (err) return done(err);
            return done();
          });
      });

      it('should not update an order if values are not provided', (done) => {
        const orderUpdate = { };
        request(app).put('/api/v1/orders/3')
          .send(orderUpdate)
          .expect('Content-Type', /json/)
          .expect(400)
          .expect(/{"message":"Values not provided"}/, done);
      });

      it('should not post an order if the specific order is missing', (done) => {
        request(app).put('/api/v1/orders/9')
          .expect('Content-Type', /json/)
          .expect(404)
          .expect(/{"message":"That particular order was not found on our server"}/, done);
      });

      describe('PUT /an order with bad data', () => {
        it('should not update the order and show error', (done) => {
          const orderUpdate = {
            food: {
              foodname: 7,
              quantity: 6,
              price: 400.00,
            },
            foodstatus: 'delivered',
          };
          request(app).put('/api/v1/orders/3')
            .send(orderUpdate)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(/{"errormessage":"foodname should be a string","status":false}/, done);
        });

        it('should not update the order and show error', (done) => {
          const orderUpdate = {
            food: {
              foodname: 'rice',
              quantity: 'six',
              price: 400.00,
            },
            foodstatus: 'delivered',
          };
          request(app).put('/api/v1/orders/3')
            .send(orderUpdate)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(/{"errormessage":"quantity should be an integer","status":false}/, done);
        });

        it('should not update the order and show error', (done) => {
          const orderUpdate = {
            food: {
              foodname: 'rice',
              quantity: 6,
              price: 'five naira',
            },
            foodstatus: 'delivered',
          };
          request(app).put('/api/v1/orders/3')
            .send(orderUpdate)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(/{"errormessage":"price should be a number","status":false}/, done);
        });

        it('should not update the order and show error', (done) => {
          const orderUpdate = {
            food: 'foodname',
            foodstatus: 'delivered',
          };
          request(app).put('/api/v1/orders/3')
            .send(orderUpdate)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect(/{"errormessage":"food should be an object","status":false}/, done);
        });
      });
    });

    describe('GET /uncovered route ', () => {
      it('should show an error object', (done) => {
        request(app).get('/api/v2/orders')
          .expect('Content-Type', /json/)
          .expect(404)
          .expect(/{"message":"Oops! That page was not found on our server. Use a different route. Error is 404"}/, done);
      });
    });
  });
}
// JS Objects Tests End Here

// DB Tests Start Here
describe('FastFoodFast', () => {
  let authToken;
  describe('GET /', () => {
    it('welcomes the user', (done) => {
      request(app).get('/')
        .expect(200)
        .expect(/Welcome to FastFoodFast/, done);
    });
  });

  let randomMail = test@mail.com;
  describe('POST /auth/signup', () => {
    it('should sign up', (done) => {
      randomMail = `${Math.random()}this@test.com`;
      const signupdetails = {
        fullname: 'AbdulAzeez',
        email: randomMail,
        password: 'test',
      };
      request(app).post('/api/v1/auth/signup')
        .send(signupdetails)
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          authToken = res.body.token;
          expect(res.body.message).to.equal('Congrats! Your account is ready');
          if (err) return done(err);
          return done();
        });
    });
  });

  describe('POST /auth/login', () => {
    it('should login', (done) => {
      const logindetails = {
        email: randomMail,
        password: 'test',
      };
      request(app).post('/api/v1/auth/login')
        .send(logindetails)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          authToken = res.body.token;
          expect(res.body.message).to.equal('You are logged in');
          if (err) return done(err);
          return done();
        });
    });
  });

  describe('POST /orders', () => {
    it('should create a new order', (done) => {
      const newOrder = {
        foodname: 'amala',
        quantity: 4,
        price: 3,
      };
      request(app).post('/api/v1/orders')
        .set('x-access-token', authToken)
        .send(newOrder)
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body).to.have.property('foodname');
          expect(res.body).to.have.property('owner_id');

          if (err) return done(err);
          return done();
        });
    });
  });

  describe('GET /orders ', () => {
    it('should get all orders', (done) => {
      request(app).get('/api/v1/orders')
        .set('x-access-token', authToken)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('rows');
          expect(res.body).to.have.property('rowCount');
          if (err) return done(err);
          return done();
        });
    });
  });
  describe('GET /order', () => {
    it('should get a single order', (done) => {
      request(app).get('/api/v1/orders/3')
        .set('x-access-token', authToken)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('id');
          expect(res.body).to.have.property('foodname');
          expect(res.body).to.have.property('quantity');
          expect(res.body).to.have.property('price');
          expect(res.body).to.have.property('foodstatus');
          expect(res.body).to.have.property('owner_id');
          if (err) return done(err);
          return done();
        });
    });

    it('should not get an order if the order is not existing', (done) => {
      request(app).get('/api/v1/orders/9000')
        .set('x-access-token', authToken)
        .expect('Content-Type', /json/)
        .expect(404)
        .expect(/{"message":"this order was not found on our server"}/, done);
    });
  });


  describe('PUT /an order', () => {
    it('should update an order', (done) => {
      const orderUpdate = {
        foodstatus: 'delivered',
      };
      request(app).put('/api/v1/orders/3')
        .set('x-access-token', authToken)
        .send(orderUpdate)
        .expect('Content-Type', /json/)
        .expect(202)
        .end((err, res) => {
          expect(res.body).to.have.property('foodname');
          expect(res.body.quantity).to.equal(6);
          expect(res.body.price).to.equal('400');
          expect(res.body.foodstatus).to.equal('delivered');
          if (err) return done(err);
          return done();
        });
    });

    it('should not update an order if token is not provided', (done) => {
      const orderUpdate = {
        foodstatus: 'delivered',
      };
      request(app).put('/api/v1/orders/3')
        .send(orderUpdate)
        .expect('Content-Type', /json/)
        .expect(400)
        .expect(/{"message":"Token is not provided"}/, done);
    });

    it('should not update an order if the specific order is missing', (done) => {
      request(app).put('/api/v1/orders/9000')
        .set('x-access-token', authToken)
        .send({
          foodstatus: 'delivered',
        })
        .expect('Content-Type', /json/)
        .expect(404)
        .expect(/{"message":"that order was not found"}/, done);
    });

    describe('PUT /an order with bad data', () => {
      it('should not update the order and show error', (done) => {
        const orderUpdate = {
          foodstatus: 80,
        };
        request(app).put('/api/v1/orders/3')
          .set('x-access-token', authToken)
          .send(orderUpdate)
          .expect('Content-Type', /json/)
          .expect(400)
          .expect(/{"errormessage":"foodstatus should be a string","status":false}/, done);
      });
    });
  });

  describe('GET /menu', () => {
    it('should get all menu', (done) => {
      request(app).get('/api/v1/menu')
        .set('x-access-token', authToken)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('rows');
          expect(res.body.rows).to.be.a('array');
          if (err) return done(err);
          return done();
        });
    });
  });

  describe('POST /menu', () => {
    it('should create a new order', (done) => {
      const newOrder = {
        foodname: 'amala',
        price: 3,
      };
      request(app).post('/api/v1/menu')
        .set('x-access-token', authToken)
        .send(newOrder)
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body).to.have.property('foodname');
          expect(res.body).to.have.property('price');

          if (err) return done(err);
          return done();
        });
    });
  });

  describe('GET /uncovered route ', () => {
    it('should show an error object', (done) => {
      request(app).get('/api/v2/orders')
        .expect('Content-Type', /json/)
        .expect(404)
        .expect(/{"message":"Oops! That page was not found on our server. Use a different route. Error is 404"}/, done);
    });
  });
});
