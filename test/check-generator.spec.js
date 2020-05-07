const generator = require('../src/check-generator.js');
const assert = require('assert');
const { Readable } = require('stream');

describe('check-generation', () => {
    const content = 'a';

    it('should create a valid sha1 and md5 string', async () => {
        const res = await generator(Readable.from(content));
        assert.equal(res.sha1, '86f7e437faa5a7fce15d1ddcb9eaeaea377667b8');
        assert.equal(res.md5, '0cc175b9c0f1b6a831c399e269772661');
    });
});
