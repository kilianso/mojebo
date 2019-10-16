import { help } from '../util/helpers';
import { initOnReady } from '../util/helpers';

export default class Demo {
	constructor(element) {
		//setup
		this.el = element;
		
		//init
		this.init();
	}
	
	init() {
		help('run some additional helper functions');
		console.log('new instance was created based on element:', this.el);
	}

}

initOnReady('.js-demo', Demo)