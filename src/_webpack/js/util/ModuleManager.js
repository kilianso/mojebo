if (!Element.prototype.matches) {
	Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

class ModuleManager {
	constructor(target){
		this._onChange = this._onChange.bind(this);
		const observer = new MutationObserver(this._onChange);
		this._instances = new Map();
		this._selectors = new Map();

		observer.observe(target, {
			childList: true,
			subtree: true
		});
	}

	registerModule(selector, module) {
		this._selectors.set(selector, module);
		const elements = document.querySelectorAll(selector);
		if(elements){
			for (let i = 0, len = elements.length; i < len; i++){
				this.registerInstance(elements[i], new module(elements[i]));
			}
		}
	}

	registerInstance(node, instance) {
		this._instances.set(node, instance);
	}

	_onChange(mutationsList, observer) {
		for (let i = 0, len = mutationsList.length; i < len; i++) {
			let mutation = mutationsList[i];
			if (mutation.type !== 'childList') {
				continue;
			}

			for (let k = 0, l = mutation.removedNodes.length; k < l; k++) {
				this._applyNested(mutation.removedNodes[k], true);
			}

			for (let k = 0, l = mutation.addedNodes.length; k < l; k++) {
				this._applyNested(mutation.addedNodes[k]);
			}
		}
	}

	_applyNested(node, destroy = false) {
		if (node.nodeType === Node.ELEMENT_NODE) {
			for (let i = 0, len = node.childNodes.length; i < len; i++) {
				this._applyNested(node.childNodes[i], destroy);
			}

			if (destroy) {
				if (this._instances.has(node)) {
					const instance = this._instances.get(node);
					if (typeof instance.destroy === 'function') {
						instance.destroy();
					}
					console.log("❌ removed", node);
					this._instances.delete(node);
				}
			} else {
				this._selectors.forEach( (module, selector) => {
					if (node.matches(selector)) {
						this.registerInstance(node, new module(node));
						console.log("✅ added", selector, node);
					}
				});
			}
		}
	}
}

export default ModuleManager;
