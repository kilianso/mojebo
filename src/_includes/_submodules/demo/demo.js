// This is how we make sure styles of this module are loaded
import './demo.scss';

import { initOnReady } from '_js/util/helpers';

let counter = 0;

const removeHandler = (e) => {
	const node = e.currentTarget.parentNode;
	if (node) {
		node.parentNode.removeChild(node);
	}
};

export default class Demo {
	constructor(element) {
		//setup
		this.el = element;
		this._btnRemove = this.el.querySelector('.demo__btnRemove');
		this._btnRemove.addEventListener('click', removeHandler);
		this.el.querySelector('.demo__title').textContent = `Demo ${++counter}`;

		console.log('new instance was created based on element:', this.el);
	}

	destroy() {
		// Destroy this instance, clean up event-listeners and references here!
		this._btnRemove.removeEventListener('click', removeHandler);
		this._btnRemove = null;
		this.el = null;
	}
}

initOnReady('.js-demo', Demo);
