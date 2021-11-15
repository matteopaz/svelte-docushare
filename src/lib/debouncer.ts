// Export default a function that takes a function and time in ms and returns a debounced version of that function.
function debounce(func, wait) {
	let timeout;
	return function () {
		const context = this;
		const args = arguments;
		const later = function () {
			timeout = null;
			func.apply(context, args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

export default debounce;