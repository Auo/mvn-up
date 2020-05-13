const upload = require('../src/upload.js');
const nock = require('nock');
const assert = require('assert');
const { Readable } = require('stream');

describe('upload', () => {
    it('should upload a file to the correct url', async () => {
        const scope = nock('http://127.0.0.1')
            .put('/maven-snapshots/com/auo/github/artifact.zip')
            .reply(200, 'path matched')

        await upload('http://127.0.0.1/maven-snapshots','com/auo/github/artifact.zip',  Readable.from('a'), { username: 'user', password: 'password'});

        assert(scope.isDone(), true);
    });

    afterEach(() => nock.cleanAll());
});
