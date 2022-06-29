const assert = require('assert');
const request = require('supertest');
const server = require('../src/server');

describe('Test / request', function() {

  let mockedApp;

  this.beforeAll(function() {
    mockedApp = request(server.app);
  });

  it('Test request to /', async function() {
    const getResponse = await mockedApp.get('/');
    assert.equal(getResponse.status, 200, 'Status code');
  });

  it('Test if request to / returns timestamp', async function() {
    // Call get() method
    const getResponse = await mockedApp.get('/');

    // Test status code
    assert.equal(getResponse.status, 200, 'Status code');

    // Test response text
    assert.match(getResponse.text, /The time now is \d+<br>/, 'Time stamp');
  });

});

describe('Failing test', function() {

  it('Run random failing test', function() {
    const randomResult = Math.random() > 0.05;

    // Test random result
    assert.equal(randomResult, true, 'Random fail');
  });

});
