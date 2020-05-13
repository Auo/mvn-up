const validator = require('../src/input-validation.js');
const assert = require('assert');

const expected = (field) => new Error('Missing required field ' + field);

describe('input validation', () => {  
    it('should verify that groupId is specified', () => {
        assert.throws(() => validator(undefined), expected('groupId')); 
        assert.throws(() => validator(null), expected('groupId')); 
    });

    it('should verify that artifactId is specified', () => {
        assert.throws(() => validator('com.group.id', undefined), expected('artifactId')); 
        assert.throws(() => validator('com.group.id', null), expected('artifactId')); 
    });

    it('should verify that version is specified', () => {
        assert.throws(() => validator('com.group.id', 'artifact_id', undefined), expected('version')); 
        assert.throws(() => validator('com.group.id', 'artifact_id', null), expected('version')); 
    });

    it('should verify that packaging is specified', () => {
        assert.throws(() => validator('com.group.id', 'artifact_id', '1.0.2', undefined), expected('packaging')); 
        assert.throws(() => validator('com.group.id', 'artifact_id', '1.0.2', null), expected('packaging')); 
    });

    it ('should verify that file exist and is specified', () => {
        assert.throws(() => validator('com.group.id', 'artifact_id', '1.0.2', 'zip', undefined), expected('file')); 
        assert.throws(() => validator('com.group.id', 'artifact_id', '1.0.2','zip', null), expected('file')); 

        assert.throws(() => validator('com.group.id', 'artifact_id', '1.0.2', 'zip', './file/does/not/exist.zip'), new Error('Specified file path: ./file/does/not/exist.zip does not exist')); 
        assert.throws(() => validator('com.group.id', 'artifact_id', '1.0.2', 'zip', './'), new Error('Specified file path: ./ is a directory'));
    });

    it('should verify that url is specified', () => {
        assert.throws(() => validator('com.group.id', 'artifact_id', '1.0.2', 'zip', './test/test.zip', null), expected('url'));
        assert.throws(() => validator('com.group.id', 'artifact_id', '1.0.2', 'zip', './test/test.zip', undefined), expected('url'));
        assert.throws(() => validator('com.group.id', 'artifact_id', '1.0.2', 'zip', './test/test.zip', 'abc'), new Error('Specified url: abc is not valid'));
    });
});
