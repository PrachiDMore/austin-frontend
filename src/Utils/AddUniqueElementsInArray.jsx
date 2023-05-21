const addElementInArray = (array, element) => {
	const setArray = new Set(array);
	console.log(setArray)
	setArray.add(element);
	console.log([...setArray])
	return [...setArray]
}

export default addElementInArray;