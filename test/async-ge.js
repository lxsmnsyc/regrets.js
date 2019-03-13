/* eslint-disable no-undef */
import assert from 'assert';
import GE from '../src/async-ge';

/**
 *
 */
describe('GE', () => {
  /**
   *
   */
  it('should return a Promise', () => {
    assert(GE(1, 2) instanceof Promise);
  });
  /**
   *
   */
  it('should resolve to true if a value is greater than the other value', (done) => {
    GE(3, 2).then(x => (x ? done() : done(false)));
  });
  /**
   *
   */
  it('should resolve to true if a value is equal to the other value', (done) => {
    GE(2, 2).then(x => (x ? done() : done(false)));
  });
  /**
   *
   */
  it('should resolve to false if a value is less than the other value', (done) => {
    GE(1, 2).then(x => (x ? done(false) : done()));
  });
});
