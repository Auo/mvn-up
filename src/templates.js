const templates = {
    pom: (groupId, artifactId, version, packaging) => {
        return {
            path: `${toPath(groupId)}/${artifactId}/${version}/${artifactId}-${version}.pom`,
            content: `<project xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
        <modelVersion>4.0.0</modelVersion>
        <groupId>${groupId}</groupId>
        <artifactId>${artifactId}</artifactId>
        <version>${version}</version>
        <packaging>${packaging}</packaging>
    </project>` }
    },

    snapshotMetadata: (groupId, artifactId, version, lastUpdated) => {
        return {
            path: `${toPath(groupId)}/${artifactId}/${version}/maven-metadata.xml`,
            content: `<metadata>
        <groupId>${groupId}</groupId>
        <artifactId>${artifactId}</artifactId>
        <version>${version}</version>
        <versioning>
            <lastUpdated>${lastUpdated}</lastUpdated>
        </versioning>
    </metadata>`}
    },

    artifactMetadata: (groupId, artifactId, version, lastUpdated) => {
        return {
            path: `${toPath(groupId)}/${artifactId}/maven-metadata.xml`,
            content: `<metadata>
        <groupId>${groupId}</groupId>
        <artifactId>${artifactId}</artifactId>
        <version>${version}</version>
        <versioning>
            <latest>${version}</latest>
            <versions>
                <version>${version}</version>
            </versions>
            <lastUpdated>${lastUpdated}</lastUpdated>
        </versioning>
    </metadata>`}
    }
}

const toPath = (groupId) => groupId.replace(/\./g, '/');

module.exports = { templates, toPath };