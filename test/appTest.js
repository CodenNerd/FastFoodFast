const { assert } = require('chai');
const app = require('../app').default;

describe('App', () => {
  it('should return hello', () => {
    assert.equal(app(), 'hello');
  });
});
