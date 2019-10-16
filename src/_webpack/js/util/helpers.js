export function help(args) {
	return console.log(args);
}

export function initOnReady(element, instance) {
	document.addEventListener('DOMContentLoaded', () => {
		const elements = document.querySelectorAll(element);
		if(elements){
			elements.forEach((el) => {
				new instance(el)
			});
		}
	});
}