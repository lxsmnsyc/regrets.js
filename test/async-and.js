/* eslint-disable no-undef */
import assert from 'assert';
import And from '../src/async-and';

/**
 *
 */
describe('And', () => {
  /**
   *
   */
  it('should return a Promise', () => {
    assert(And(true, true) instanceof Promise);
  });
  /**
   *
   */
  it('should resolve to true if both resolved values are truthy', (done) => {
    And(true, true).then(x => (x ? done() : done(false)));
  });
  /**
   *
   */
  it('should resolve to false if one of the values are falsey', (done) => {
    And(true, false).then(x => (x ? done(false) : done()));
  });
});
