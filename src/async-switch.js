
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
import { resolve, all } from './utils';
/**
 * @desc
 * a switch statement is a type of selection control mechanism
 * used to allow the value of a variable or expression to change
 * the control flow of program execution via search and map.
 */
export default class AsyncSwitch {
  /**
   * @desc
   * Creates an AsyncSwitch instance given
   * the subject to be selected with.
   * @param {Function|Promise|any} subject
   */
  constructor(subject) {
    this.subject = subject;
    /**
     * @private
     */
    this.cases = [];
  }

  /**
   * @desc
   * Register values to be selected from
   * @param  {...any} matches
   * @returns {AsyncSwitch}
   */
  case(...matches) {
    /**
     * @private
     */
    this.cases = [...this.cases, ...matches];
    return this;
  }

  /**
   * @ignore
   */
  setParent(parent) {
    /**
     * @private
     */
    this.parent = parent;
    return this;
  }

  /**
   * @ignore
   */
  parentBroken() {
    if (this.parent instanceof AsyncSwitch) {
      return this.parent.breakSuccess || this.parent.parentBroken();
    }
    return false;
  }

  /**
   * @ignore
   */
  notBroken() {
    if (this.breakSuccess || this.parentBroken()) {
      return false;
    }
    if (this.broken) {
      this.breakSuccess = true;
    }
    return true;
  }

  /**
   * @desc
   * Initiate a selection mechanism given the previous
   * cases.
   * @param {Function} scope
   * @returns {AsyncSwitch}
   */
  do(scope) {
    const { subject } = this;
    const if1 = typeof subject === 'function';
    const if2 = typeof scope === 'function';
    return new AsyncSwitch(
      all(this.cases).then(
        v => resolve(if1 ? subject() : subject).then(
          x => (v.includes(x) ? resolve(if2 ? this.notBroken() && resolve(scope()).then(
            () => x,
          ) : scope) : x),
        ),
      ),
    ).setParent(this);
  }

  /**
   * @desc
   * Create a break signal that tells the next cases to
   * not execute if the previous case is successful.
   *
   * @returns {AsyncSwitch}
   */
  break() {
    if (this.parent instanceof AsyncSwitch) {
      this.parent.broken = true;
    }
    return this;
  }

  /**
   * @desc
   * Attaches a callback that is executed with or without
   * any cases
   * @param {Function} scope
   * @returns {Promise}
   */
  default(scope) {
    const { subject } = this;
    const if1 = typeof subject === 'function';
    const if2 = typeof scope === 'function';
    return resolve(if1 ? subject() : subject).then(
      () => (if2 ? !this.parentBroken() && scope() : scope),
    );
  }
}
