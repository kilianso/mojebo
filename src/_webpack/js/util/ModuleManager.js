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
			elements.forEach((el) => {
				this.registerInstance(el, new module(el));
			});
		}
	}

	registerInstance(node, instance) {
		this._instances.set(node, instance);
	}

	_onChange(mutationsList, observer) {
		for(let mutation of mutationsList) {
			if (mutation.type !== 'childList') {
				continue;
			}
			for (let node of mutation.removedNodes) {
				this._applyNested(node, 'destroy');
			}
			for (let node of mutation.addedNodes) {
				this._applyNested(node);
			}
		}
	}

	_applyNested(node, mode = 'add') {
		if (node.nodeType === Node.ELEMENT_NODE) {
			node.childNodes.forEach(node => {
				this._applyNested(node, mode);
			});

			if (mode === 'destroy') {
				if (this._instances.has(node)) {
					const instance = this._instances.get(node);
					if (typeof instance.destroy === 'function') {
						instance.destroy();
					}
					console.log("❌ removed", node);
					this._instances.delete(node);
				}
			} else if (mode === 'add') {
				for (let [selector, module] of this._selectors) {
					if (node.matches(selector)) {
						this.registerInstance(node, new module(node));
						console.log("✅ added", selector, node);
					}
				}
			}
		}
	}
}

export default ModuleManager;
