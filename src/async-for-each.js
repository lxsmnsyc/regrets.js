
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
 * @ignore
 */
const defer = (item, scope) => resolve(item).then(x => resolve(scope(x)));

/**
 * Applies asynchronous iteration for iterables
 */
export default class AsyncForEach {
  /**
   * Creates an AsyncForEach instance
   * with the given iterable
   * @param {Iterable} iterable
   */
  constructor(iterable) {
    /**
     * @ignore
     */
    this.iterable = iterable;
  }

  /**
   * Initiate iteration of items from the iterable
   * @param {Function} scope
   * @returns {Promise}
   */
  do(scope) {
    let prev;
    // eslint-disable-next-line no-restricted-syntax
    for (const item of this.iterable) {
      if (typeof prev === 'undefined') {
        prev = defer(item, scope);
      } else {
        prev = prev.then(() => defer(item, scope));
      }
    }
    return resolve(prev);
  }
}
