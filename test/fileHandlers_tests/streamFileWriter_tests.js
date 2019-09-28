'use strict';

const fs = require('fs');
const expect = require('chai').expect;
const streamFileWriter = require('../../src/fileHandlers/streamFileWriter');

describe('streamFileWriter tests:', () => {
    it('A object should be writed into an file', () => {
        let content = 'Random content to be writed';
        streamFileWriter('./test/fileHandlers_tests/dummyObject.txt', content);
        expect(fs.existsSync('./test/fileHandlers_tests/dummyObject.txt')).to.be.true;
        fs.unlinkSync('./test/fileHandlers_tests/dummyObject.txt');
    });
});
