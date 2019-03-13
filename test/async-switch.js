/* eslint-disable no-undef */
import assert from 'assert';
import AsyncSwitch from '../src/async-switch';

describe('AsyncSwitch', () => {
  describe('#case', () => {
    it('should return the same AsyncSwitch reference', () => {
      const asyncSwitch = new AsyncSwitch(9);
      assert(asyncSwitch.case(9) === asyncSwitch);
    });
  });
  describe('#break', () => {
    it('should return the same AsyncSwitch reference', () => {
      const asyncSwitch = new AsyncSwitch(9);
      assert(asyncSwitch.break() === asyncSwitch);
    });
  });
  describe('#do', () => {
    it('should return an AsyncSwitch', () => {
      assert(new AsyncSwitch(9).case(9).do(() => {}) instanceof AsyncSwitch);
    });
    it('should execute the scope if a match is successful', (done) => {
      new AsyncSwitch(9).case(9).do(done);
    });
    it('should not execute the scope if a match is unsuccessful', (done) => {
      new AsyncSwitch(9).case(8).do(() => done(false));
      setTimeout(done, 100);
    });
    it('should not execute the scope if a match is successful but a break signal is received before.', (done) => {
      new AsyncSwitch(9)
        .case(7, 8, 9)
        .do(() => {})
        .break()
        .case(7, 8, 9)
        .do(() => done(false));

      setTimeout(done, 100);
    });
  });
  describe('#default', () => {
    it('should return a Promise', () => {
      assert(new AsyncSwitch(9).case(9).default(() => {}) instanceof Promise);
    });
    it('should execute the scope if no break signals are sent', (done) => {
      new AsyncSwitch(9).case(9).default(done);
    });
    it('should execute the scope ifa match is unsuccessful', (done) => {
      new AsyncSwitch(9).case(8).default(done);
    });
    it('should not execute the scope if a break signal is received before.', (done) => {
      new AsyncSwitch(9)
        .case(7, 8, 9)
        .do(() => {})
        .break()
        .default(() => done(false));

      setTimeout(done, 100);
    });
  });
});
