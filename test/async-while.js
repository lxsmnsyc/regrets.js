/* eslint-disable no-undef */
import assert from 'assert';
import AsyncWhile from '../src/async-while';

describe('AsyncWhile', () => {
  describe('#do', () => {
    it('should return the same reference', () => {
      const sample = new AsyncWhile(false);

      assert(sample.do(() => {}) === sample);
    });
    it('should execute multiple times until the evaluator is false', (done) => {
      let x = 0;

      // eslint-disable-next-line no-plusplus
      new AsyncWhile(() => x < 3).do(() => x++);

      setTimeout(() => {
        if (x === 3) {
          done();
        }
      }, 100);
    });
  });
});
