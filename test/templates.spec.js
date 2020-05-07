const { templates, toPath } = require('../src/templates.js');
const assert = require('assert');

describe('template generation', () => {
    const now = '20200427111745';
    const groupId = 'com.something.else';
    const artifactId = 'some_artifact';
    const version = '1.0.2';
    const packaging = 'zip';

    it('should generate a valid pom', () => {
        const res = templates.pom(groupId, artifactId, version, packaging);

        assert.equal(res.path, 'com/something/else/some_artifact/1.0.2/some_artifact-1.0.2.pom');

        const expected = '<project xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">\n' +
            '        <modelVersion>4.0.0</modelVersion>\n' +
            '        <groupId>com.something.else</groupId>\n' +
            '        <artifactId>some_artifact</artifactId>\n' +
            '        <version>1.0.2</version>\n' +
            '        <packaging>zip</packaging>\n' +
            '    </project>'

        assert.equal(res.content, expected);
    });

    it('should generate a valid snapshot metadata', () => {
        const res = templates.snapshotMetadata(groupId, artifactId, version + '-SNAPSHOT', now);

        assert.equal(res.path, 'com/something/else/some_artifact/1.0.2-SNAPSHOT/maven-metadata.xml');

        const expected = '<metadata>\n' +
        '        <groupId>com.something.else</groupId>\n' +
        '        <artifactId>some_artifact</artifactId>\n' +
        '        <version>1.0.2-SNAPSHOT</version>\n' +
        '        <versioning>\n' +
        '            <lastUpdated>20200427111745</lastUpdated>\n' +
        '        </versioning>\n' +
        '    </metadata>';

        assert.equal(res.content, expected);
    });

    it('should generate a valid metadata', () => {
        const res = templates.artifactMetadata(groupId, artifactId, version, now);

        assert.equal(res.path, 'com/something/else/some_artifact/maven-metadata.xml');

        const expected = '<metadata>\n' +
        '        <groupId>com.something.else</groupId>\n' +
        '        <artifactId>some_artifact</artifactId>\n' +
        '        <version>1.0.2</version>\n' +
        '        <versioning>\n' +
        '            <latest>1.0.2</latest>\n' +
        '            <versions>\n' +
        '                <version>1.0.2</version>\n' +
        '            </versions>\n' +
        '            <lastUpdated>20200427111745</lastUpdated>\n' +
        '        </versioning>\n' +
        '    </metadata>';

        assert.equal(res.content, expected);
    });

    it('should be able to generate a path from groupId', () => {
        assert.equal(toPath('com.something.else'), 'com/something/else');
    });
});