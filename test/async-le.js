/* eslint-disable no-undef */
import assert from 'assert';
import LE from '../src/async-le';

/**
 *
 */
describe('LE', () => {
  /**
   *
   */
  it('should return a Promise', () => {
    assert(LE(1, 2) instanceof Promise);
  });
  /**
   *
   */
  it('should resolve to true if a value is less than the other value', (done) => {
    LE(1, 2).then(x => (x ? done() : done(false)));
  });
  /**
   *
   */
  it('should resolve to true if a value is equal to the other value', (done) => {
    LE(2, 2).then(x => (x ? done() : done(false)));
  });
  /**
   *
   */
  it('should resolve to false if a value is greater than the other value', (done) => {
    LE(3, 2).then(x => (x ? done(false) : done()));
  });
});
