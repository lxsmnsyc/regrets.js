/* eslint-disable no-undef */
import assert from 'assert';
import AsyncWhile from '../src/async-while';

/**
 *
 */
describe('AsyncWhile', () => {
  /**
   *
   */
  describe('#do', () => {
    /**
     *
     */
    it('should return a Promise', () => {
      assert(new AsyncWhile(false).do(() => {}) instanceof Promise);
    });
    /**
     *
     */
    it('should execute multiple times until the evaluator is false', (done) => {
      let x = 0;

      // eslint-disable-next-line no-plusplus
      new AsyncWhile(() => x < 3).do(() => x++).then(v => (v === 3 ? done() : done(false)));
    });
  });
});
