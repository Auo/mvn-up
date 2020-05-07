const timestamp = require('../src/timestamp.js');
const assert = require('assert');

describe('timestamp generation', () => {
    it('valid timestamp', () => {
        const date = new Date('2020-04-24T12:13:14.151Z');
        assert.equal(timestamp(date), '20200424121314');
    });
});
