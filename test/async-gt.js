/* eslint-disable no-undef */
import assert from 'assert';
import GT from '../src/async-gt';

/**
 *
 */
describe('GT', () => {
  /**
   *
   */
  it('should return a Promise', () => {
    assert(GT(1, 2) instanceof Promise);
  });
  /**
   *
   */
  it('should resolve to true if a value is greater than the other value', (done) => {
    GT(3, 2).then(x => (x ? done() : done(false)));
  });
  /**
   *
   */
  it('should resolve to false if a value is equal to the other value', (done) => {
    GT(2, 2).then(x => (x ? done(false) : done()));
  });
  /**
   *
   */
  it('should resolve to false if a value is less than the other value', (done) => {
    GT(1, 2).then(x => (x ? done(false) : done()));
  });
});
