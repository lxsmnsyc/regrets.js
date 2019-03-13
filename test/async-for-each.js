/* eslint-disable no-undef */
import assert from 'assert';
import AsyncForEach from '../src/async-for-each';

describe('AsyncForEach', () => {
  describe('#do', () => {
    it('should return a Promise', () => {
      assert(new AsyncForEach([]).do(() => {}) instanceof Promise);
    });
    it('should iterate all items in the iterable', (done) => {
      const items = [1, 2, 3, 4, 5];
      let itemCount = 5;
      let booleanAcc = true;
      new AsyncForEach(items).do((item) => {
        booleanAcc = booleanAcc && items.includes(item);
        itemCount += 1;
      }).then(
        () => (booleanAcc && itemCount === 0 ? done() : done(false)),
      );
    });
  });
});
