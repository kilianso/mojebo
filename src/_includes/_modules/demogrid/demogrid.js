// This is how we make sure styles of this module are loaded
import './demogrid.scss';

import { initOnReady } from '_js/util/helpers';

export default class DemoGrid {
	constructor(element) {
		//setup
		this.el = element;
		this._clickHandler = this._clickHandler.bind(this);
		this._btn = this.el.querySelector('.demo-grid__button');
		this._btn.addEventListener('click', this._clickHandler);
	}

	destroy() {
		// Destroy this instance, clean up event-listeners and references here!
		this._btn.removeEventListener('click', this._clickHandler);
		this._btn = null;
		this.el = null;
	}

	_clickHandler() {
		const demo = document.createElement('div');
		demo.classList.add('js-demo');
		demo.innerHTML = '<h2 class="demo__title">Demo</h2><button class="demo__btnRemove">Remove me</button>';
		this.el.appendChild(demo);
	}
}

initOnReady('.js-demo-grid', DemoGrid);
