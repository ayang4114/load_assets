import {it, describe} from 'mocha';
import chai, {expect} from 'chai';
import {createContent} from '../load_assets';

describe('Test suite', function () {
  it('should create empty object string', function () {
    const noContent = {};
    const result = createContent(noContent);
    expect(result).to.equal('{}');
  });
  it('should create a string representation of the object, removing the quotes in require()', function () {
    const content = {
      hello: "require('./src/hello.png')"
    };
    const result = createContent(content);
    expect(result.split('\n')).has.length(3);
  });
  it('should ignore empty nested objects', function () {
    const content = {
      hello: "require('./src/hello.png')",
      cold: {
        bold: {}
      }
    };
    const result = createContent(content, 2);
    expect(result.split('\n')).has.length(3);
    expect(result.split('\n')).deep.equals(['{', `  "hello": require('./src/hello.png'),`, '}']);
  });
  it('should include nested declarations', function () {
    const content = {
      hello: "require('./src/hello.png')",
      cold: {
        world: "require('./src/cold/word.png')",
        bold: {}
      }
    };
    const result = createContent(content, 2);
    expect(result.split('\n').sort()).deep.equals([
      '{',
      `  "hello": require('./src/hello.png'),`,
      `  "cold": {`,
      `    "world": require('./src/cold/word.png'),`,
      `  },`,
      '}'
    ].sort());
  });
});