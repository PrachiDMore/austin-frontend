const addElementInArray = (array, element) => {
	const setArray = new Set(array);
	setArray.add(element);
	return [...setArray]
}

export default addElementInArray;