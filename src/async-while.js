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
const While = (evaluator, scope) => Promise.resolve(evaluator).then(
  x => (x ? Promise.resolve(scope()).then(() => While(evaluator, scope)) : false),
);

/**
 * @desc
 * A repetitive constrol structure that both evaluates the condition
 * and executes it scope asynchrously.
 * @example
 * new AsyncWhile(sleep(5000, true)).do(() => console.log("5000ms passed"));
 *
 */
export default class AsyncWhile {
  /**
   * @desc
   * Creates an AsyncWhile instance
   * @param {Function|Promise} evaluator a Promise or a function that is evaluated every cycle.
   */
  constructor(evaluator) {
    this.evaluator = evaluator;
  }

  /**
   * @desc
   * Attaches a callback to the AsyncWhile that is executed while the evaluator resolves to true.
   * @param {Function} scope
   * @returns {AsyncWhile} the same reference
   */
  do(scope) {
    const { evaluator } = this;
    While(typeof evaluator === 'function' ? evaluator() : evaluator, scope);
    return this;
  }
}
