const isSnapshot = require('../src/version');
const assert = require('assert');

describe('versioning', () => {
    it('should identify SNAPSHOT versions', () => {
        assert.equal(isSnapshot('1.1.1-SNAPSHOT'), true);
        assert.equal(isSnapshot('1.1.1'), false);
    });
});
