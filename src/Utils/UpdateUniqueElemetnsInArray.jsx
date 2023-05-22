const updateElementsInArray = (array, element, oldElement) => {
	const setArray = new Set(array);
	setArray.delete(oldElement);
	setArray.add(element);
	return [...setArray]
}

export default updateElementsInArray;