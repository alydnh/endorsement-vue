const deepClone = source => {
    if (source === undefined || source === null) {
        return source;
    }
    if (
        typeof source === 'string' ||
        typeof source === 'number' ||
        typeof source === 'boolean' ||
        typeof source === 'undefined' ||
        source === null
    ) {
        return source;
    }

    if (Array.isArray(source)) {
        const newArray = [];
        for (let i = 0; i < source.length; i++) {
            newArray.push(deepClone(source[i]));
        }
        return newArray;
    }

    const newObject = {};
    Object.keys(source).forEach(prop => {
        if (Object.prototype.hasOwnProperty.call(source, prop)) {
            newObject[prop] = deepClone(source[prop]);
        }
    });

    return newObject;
};

export default deepClone;
