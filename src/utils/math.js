export const randomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const shuffle = array => {
	var currentIndex = array.length,
		temporaryValue,
		randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
};

// Used like so
// let arr = [2, 11, 37, 42];
// shuffle(arr);
// console.log(arr);

export const categoryMin = 1;
export const subjectMin = 5;
export const chapterMin = 1;
export const difficultyMin = 1;
export const questionIdMin = 1;

export const categoryMax = 2;
export const subjectMax = 5;
export const chapterMax = 1;
export const difficultyMax = 1;
export const questionIdMax = 10;
