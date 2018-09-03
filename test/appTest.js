const assert = require('chai').assert;
const app = require('../app').default;

describe('App', () =>{
    it('should return hello', ()=>{
        assert.equal(app(),'hello');
    });
});