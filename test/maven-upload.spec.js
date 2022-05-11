const mavenUploader = require('../src/maven-upload');
const path = require('path');
const nock = require('nock');
const assert = require('assert');

describe('file uploading', () => {
    it('should send files in correct order', async () => {
        let ix = 0;

        const expected = [
            '/com/some/group/some_artifact_id/1.0.0-SNAPSHOT/some_artifact_id-1.0.0-SNAPSHOT-Distribution.zip',
            '/com/some/group/some_artifact_id/1.0.0-SNAPSHOT/some_artifact_id-1.0.0-SNAPSHOT-Distribution.zip.md5',
            '/com/some/group/some_artifact_id/1.0.0-SNAPSHOT/some_artifact_id-1.0.0-SNAPSHOT-Distribution.zip.sha1',
            '/com/some/group/some_artifact_id/1.0.0-SNAPSHOT/some_artifact_id-1.0.0-SNAPSHOT.pom',
            '/com/some/group/some_artifact_id/1.0.0-SNAPSHOT/some_artifact_id-1.0.0-SNAPSHOT.pom.md5',
            '/com/some/group/some_artifact_id/1.0.0-SNAPSHOT/some_artifact_id-1.0.0-SNAPSHOT.pom.sha1',
            '/com/some/group/some_artifact_id/maven-metadata.xml',
            '/com/some/group/some_artifact_id/maven-metadata.xml.md5',
            '/com/some/group/some_artifact_id/maven-metadata.xml.sha1',
            '/com/some/group/some_artifact_id/1.0.0-SNAPSHOT/maven-metadata.xml',
            '/com/some/group/some_artifact_id/1.0.0-SNAPSHOT/maven-metadata.xml.md5',
            '/com/some/group/some_artifact_id/1.0.0-SNAPSHOT/maven-metadata.xml.sha1'
        ];

        const scope = nock('http://127.0.0.1')
            .put(/.*/)
            .times(12)
            .reply(200, (uri, _requestBody) => {
                assert.equal(uri, expected[ix]);
                ix++;
                return [200, 'OK']
            });

            await mavenUploader('com.some.group',
            'some_artifact_id',
            '1.0.0-SNAPSHOT',
            'zip',
            'Distribution',
            path.join(__dirname,'test.zip'),
            'http://127.0.0.1',
            { username: 'username', password:'password'});
            assert(scope.isDone(), true);
    });

    afterEach(() => nock.cleanAll());
});
