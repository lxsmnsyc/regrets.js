/**
 * @license
 * MIT License
 *
 * Copyright (c) 2019 Alexis Munsayac
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 *
 * @author Alexis Munsayac <alexis.munsayac@gmail.com>
 * @copyright Alexis Munsayac 2019
 */
import { resolve } from './utils';

/**
 * Fundamental async decision-making control structure
 *
 * AsyncIf evaluates the given value, synchronous or asynchronous
 * and executes the "then" callback if the value is truthy, otherwise
 * executes the "else" or "elseIf" callbacks.
 *
 * Both the tested value and the callbacks can be asynchronous.
 */
export default class AsyncIf {
  /**
   * Creates an AsyncIf instance
   *
   * It is highly recommended that the given value
   * be a Promise instance.
   * @example
   * const asyncIf = new AsyncIf(sleep(5000, true));
   * @param {?Promise} promise
   */
  constructor(promise) {
    /**
     * The promise context of the AsyncIf instance
     * @type {?Promise}
     */
    this.promise = resolve(promise);
  }

  /**
   * Attaches a callback to an AsyncIf instance and executes
   * the callback if the AsyncIf's resolved value is truthy.
   * @example
   * new AsyncIf(Promise.resolve(x % 2 == 0)).then(() => console.log("Value is even!"));
   * @param {?Function} scope
   * @returns {AsyncIf}
   */
  then(scope) {
    if (typeof scope === 'function') {
      return new AsyncIf(
        this.promise.then(x => (x ? resolve(scope()).then(() => x) : this.promise)),
      );
    }
    return this;
  }

  /**
   * Attaches a callback to an AsyncIf instance and executes
   * the callback if the AsyncIf's resolved value is falsey.
   * @example
   * new AsyncIf(Promise.resolve(x % 2 == 0)).else(() => console.log("Value is odd!"));
   * @param {?Function} scope
   * @returns {AsyncIf}
   */
  else(scope) {
    if (typeof scope === 'function') {
      return new AsyncIf(
        this.promise.then(x => (x ? this.promise : resolve(scope()).then(() => x))),
      );
    }
    return this;
  }

  /**
   * Attaches an AsyncIf to an AsyncIf instance that evaluates
   * if the AsyncIf's resolved value is falsey.
   * @example
   * new AsyncIf(Promise.resolve(x % 2 == 0))
   *   .elseIf(x % 2 == 1)
   *     .then() => console.log("Value is odd!"));
   * @param {?Function} promise
   * @returns {AsyncIf}
   */
  elseIf(promise) {
    return new AsyncIf(this.promise.then(x => (x ? false : promise)));
  }
}
