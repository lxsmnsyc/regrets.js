/* eslint-disable no-undef */
import assert from 'assert';

import AsyncIf from '../src/async-if';

/**
 *
 */
describe('AsyncIf', () => {
  /**
   *
   */
  describe('#then', () => {
    /**
     *
     */
    it('should return an AsyncIf instance', () => {
      assert(new AsyncIf(true).then(() => {}) instanceof AsyncIf);
    });
    /**
     *
     */
    it('should execute if the resolved promise is truthy', (done) => {
      const asyncIf = new AsyncIf(true);

      asyncIf.then(() => done());
    });
    /**
     *
     */
    it('should not execute if the resolved promise is falsey', (done) => {
      const asyncIf = new AsyncIf(false);

      asyncIf.then(() => done(false));

      setTimeout(done, 100);
    });
    /**
     *
     */
    it('should return the same instance if the passed value is not a function', () => {
      const asyncIf = new AsyncIf(false);

      assert(asyncIf.then() === asyncIf);
      assert(asyncIf.then(100) === asyncIf);
      assert(asyncIf.then('Hello') === asyncIf);
      assert(asyncIf.then(true) === asyncIf);
      assert(asyncIf.then({}) === asyncIf);
      assert(asyncIf.then([]) === asyncIf);
    });
  });
  /**
   *
   */
  describe('#else', () => {
    /**
     *
     */
    it('should return an AsyncIf instance', () => {
      assert(new AsyncIf(true).else(() => {}) instanceof AsyncIf);
    });
    /**
     *
     */
    it('should execute if the resolved promise is falsey', (done) => {
      const asyncIf = new AsyncIf(false);

      asyncIf.else(() => done());
    });
    /**
     *
     */
    it('should not execute if the resolved promise is truthy', (done) => {
      const asyncIf = new AsyncIf(true);

      asyncIf.else(() => done(false));

      setTimeout(done, 100);
    });
    /**
     *
     */
    it('should return the same instance if the passed value is not a function', () => {
      const asyncIf = new AsyncIf(false);

      assert(asyncIf.else() === asyncIf);
      assert(asyncIf.else(100) === asyncIf);
      assert(asyncIf.else('Hello') === asyncIf);
      assert(asyncIf.else(true) === asyncIf);
      assert(asyncIf.else({}) === asyncIf);
      assert(asyncIf.else([]) === asyncIf);
    });
  });
  /**
   *
   */
  describe('#elseIf', () => {
    /**
     *
     */
    it('should return an AsyncIf instance', () => {
      assert(new AsyncIf(true).elseIf(true) instanceof AsyncIf);
    });
    /**
     *
     */
    it('should execute if the resolved promise is falsey', (done) => {
      const x = 2;

      new AsyncIf(x === 1).then(() => done(false))
        .elseIf(x === 2).then(() => done());
    });
    /**
     *
     */
    it('should not execute if the resolved promise is truthy', (done) => {
      const x = 1;

      new AsyncIf(x === 1).then(() => done())
        .elseIf(x === 2).then(() => done(false));
    });
  });
});
