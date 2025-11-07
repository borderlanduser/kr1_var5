import { createElement } from '../../utils/common.js';

export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error('Can\'t instantiate AbstractComponent, only concrete one.');
    }

    this._element = null;
    this._callback = {};
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  getTemplate() {
    throw new Error('Abstract method not implemented: getTemplate');
  }

  removeElement() {
    this._element = null;
  }
}