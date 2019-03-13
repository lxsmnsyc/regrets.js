/* eslint-disable no-undef */
import assert from 'assert';
import NE from '../src/async-ne';

describe('NE', () => {
  it('should return a Promise', () => {
    assert(NE(true, true) instanceof Promise);
  });
  it('should resolve to true if both values are not equal', (done) => {
    NE(Promise.resolve(true), Promise.resolve(false)).then(x => (x ? done() : done(false)));
  });
  it('should resolve to false if both values are equal', (done) => {
    NE(Promise.resolve(true), Promise.resolve(true)).then(x => (x ? done(false) : done()));
  });
});
