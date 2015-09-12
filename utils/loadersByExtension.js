function extsToRegExp(exts) {
	return new RegExp('\\.(' + exts.map(function(ext) {
		return ext.replace(/\./g, '\\.');
	}).join('|') + ')(\\?.*)?$');
}

module.exports = function loadersByExtension(obj) {
	var loaders = [];
	var extensions;

	extensions = Object.keys(obj).map(function(key) {
		return key.split('|');
	});

	extensions = extensions.reduce(function(arr, a) {
		arr.push.apply(arr, a);
		return arr;
	}, []);

	Object.keys(obj).forEach(function(key) {
		var exts = key.split('|');
		var value = obj[key];
		var entry = {
			extensions: exts,
			test: extsToRegExp(exts),
			loaders: value
		};

		if (Array.isArray(value)) {
			entry.loaders = value;
		} else if (typeof value === 'string') {
			entry.loader = value;
		} else {
			Object.keys(value).forEach(function(property) {
				entry[property] = value[property];
			});
		}

		loaders.push(entry);
	});

	return loaders;
};
