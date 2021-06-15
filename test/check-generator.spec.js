const generator = require('../src/check-generator.js');
const fs = require('fs');
const assert = require('assert');
const { Readable } = require('stream');

describe('check-generation', () => {
    const content = 'a';

    it('should create a valid sha1 and md5 hash from a string', async () => {
        const res = await generator(Readable.from(content));
        assert.equal(res.sha1, '86f7e437faa5a7fce15d1ddcb9eaeaea377667b8');
        assert.equal(res.md5, '0cc175b9c0f1b6a831c399e269772661');
    });

    it('should create valid sha1 and md5 hash from a file', async () => {
            const res = await generator(fs.createReadStream('./test/test.zip'));

            assert.equal(res.md5, '14a49ebbef5e315d98b20c76646da3bd');
            assert.equal(res.sha1, '1d0ca30289df0ddf9e71f6913b2c7bbc034f667a');
    });
});
