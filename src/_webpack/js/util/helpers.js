import ModuleManager from "./ModuleManager";

const manager = new ModuleManager(document);

export function initOnReady(element, instance) {
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', () => {
			manager.registerModule(element, instance);
		});
	} else {
		manager.registerModule(element, instance);
	}
}
