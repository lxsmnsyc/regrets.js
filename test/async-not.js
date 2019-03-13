/* eslint-disable no-undef */
import assert from 'assert';
import Not from '../src/async-not';

/**
 *
 */
describe('Not', () => {
  /**
   *
   */
  it('should return a Promise', () => {
    assert(Not(true) instanceof Promise);
  });
  /**
   *
   */
  it('should resolve to true if the value is falsey', (done) => {
    Not(true).then(x => (x ? done() : done(false)));
  });
  /**
   *
   */
  it('should resolve to false if the value is truthy', (done) => {
    Not(true).then(x => (x ? done(false) : done()));
  });
});
