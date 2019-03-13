/* eslint-disable no-undef */
import assert from 'assert';
import AsyncRepeat from '../src/async-repeat';

/**
 *
 */
describe('AsyncRepeat', () => {
  /**
   *
   */
  describe('#until', () => {
    /**
     *
     */
    it('should return a Promise', () => {
      assert(new AsyncRepeat(() => {}).until(true) instanceof Promise);
    });
    /**
     *
     */
    it('should execute multiple times until the evaluator is true', (done) => {
      let x = 0;

      // eslint-disable-next-line no-plusplus
      new AsyncRepeat(() => x++).until(() => x === 3).then(v => (v === 3 ? done() : done(false)));
    });
  });
});
