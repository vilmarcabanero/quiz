import React, { Fragment, useState, useEffect } from 'react';
import API from '../../api';
// import * as math from '../../utils/math';

function App() {
	const [data, setData] = useState([]);
	const [categoryData, setCategoryData] = useState([]);
	const [chapter, setChapter] = useState(151);
	const [isLoading, setIsLoading] = useState(false);
	const [quizNumber, setQuizNumber] = useState('');
	const [difficulty, setDifficulty] = useState('1');
	const [doesHaveData, setDoesHaveData] = useState(true);
	const [doesTestStarted, setDoesTestStarted] = useState(false);
	const [hasChosenCategory, setHasChosenCategory] = useState(false);
	const [currentChapter, setCurrentChapter] = useState(150);
	const [url, setUrl] = useState(
		'quiz/questions/random?amount=1&chapter=151&difficulty=x'
	);
	const [urlCategory, setUrlCategory] = useState('quiz/categories?subject=x');
	const [category, setCategory] = useState(11);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			const result = await API(url);

			const formattedData = result.data.map(q => {
				const incorrectAnswersIndexes = q.incorrect_answers.length;
				const randomIndex = Math.round(
					Math.random() * (incorrectAnswersIndexes - 0) + 0
				);

				q.incorrect_answers.splice(randomIndex, 0, q.correct_answer);

				return {
					...q,
					choices: q.incorrect_answers,
				};
			});

			setData(formattedData);
			setIsLoading(false);
			if (result.data.length === 0) {
				setDoesHaveData(false);
			} else {
				setDoesHaveData(true);
			}
			console.log(formattedData);
		};

		fetchData();
	}, [url]);

	useEffect(() => {
		const fetchCategory = async () => {
			setIsLoading(true);
			const result = await API(urlCategory);

			setCategoryData(result.data);
			setIsLoading(false);
			console.log(result.data);
			// console.log(chapter);
		};

		fetchCategory();
	}, [urlCategory]);

	const chooseCategoryHandler = () => {
		setUrlCategory(`quiz/categories?subject=${category}`);
		setHasChosenCategory(true);
		console.log(categoryData);
		console.log(category);
	};

	const selectCategoryHandler = e => {
		let chosenCategory = e.target.value;
		setCategory(chosenCategory);
	};

	const startTestHandler = () => {
		if (quizNumber.trim('').length === 0 || quizNumber === '0') {
			alert('Please input number of questions');
		} else {
			setUrl(
				`quiz/questions?amount=${quizNumber}&chapter=${chapter}&difficulty=${difficulty}`
			);
			setDoesTestStarted(true);
		}
	};

	const submitTestHandler = () => {
		setDoesTestStarted(false);
	};

	const selectChapterHandler = e => {
		let chosenChapter = e.target.value;
		if (
			(chosenChapter > 150 && chosenChapter < 160) ||
			(chosenChapter > 1510 && chosenChapter < 1540)
		) {
			setCurrentChapter(150);
		} else if (
			(chosenChapter > 110 && chosenChapter < 120) ||
			(chosenChapter > 1110 && chosenChapter < 1140)
		) {
			setCurrentChapter(110);
		}
		setChapter(chosenChapter);
	};

	const difficultyHandler = e => {
		setDifficulty(e.target.value);
	};

	return (
		<div>
			{!hasChosenCategory ? (
				<div>
					<label>Select a category</label> <br />
					<select value={category} onChange={selectCategoryHandler}>
						<option value={11}>Algebra</option>
						<option value={15}>Engineering Economy</option>
					</select>
					<br />
					<button type='button' onClick={chooseCategoryHandler}>
						Choose Category
					</button>
				</div>
			) : (
				<Fragment>
					{!doesTestStarted ? (
						<div>
							<br />
							<br />
							<div>
								<label>Select Chapter</label> <br />
								<select value={chapter} onChange={selectChapterHandler}>
									{/* {categoryData} */}
									<option value={151}>Present Economy</option>
									<option value={152}>Simple Interest and Discount</option>
									<option value={153}>Compound Interest</option>
									<option value={154}>Annuity</option>
								</select>
							</div>
							<br />
							<div>
								<label>Select difficulty</label> <br />
								<select value={difficulty} onChange={difficultyHandler}>
									<option value={1}>Easy</option>
									<option value={2}>Average</option>
									<option value={3}>Difficult</option>
								</select>
							</div>
							<br />
							<div>
								<label>Input number of questions</label> <br />
								<input
									type='number'
									value={quizNumber}
									onChange={e => setQuizNumber(e.target.value)}
								/>
							</div>
							<br />
							<button type='button' onClick={startTestHandler}>
								Start test
							</button>
							<br /> <br />
						</div>
					) : (
						<div>
							{isLoading ? (
								<div>Loading ...</div>
							) : doesHaveData ? (
								<ul>
									<h5>
										Chapter{' '}
										{`${data[data.length - 1].chapter - currentChapter}: ${
											data[data.length - 1].chapterDescription
										}`}
									</h5>

									<h5>
										Difficulty:{` `}
										{difficulty === '1'
											? 'Easy'
											: difficulty === '2'
											? 'Average'
											: difficulty === '3'
											? 'Difficult'
											: 'Random difficulty'}
									</h5>
									<h5>Number of questions: {` ${data.length}`}</h5>

									{data.map(item => (
										<li key={item.questionId}>
											<p>{item.question}</p>
											{item.choices.map(choice => {
												return (
													<div key={choice}>
														<input
															type='radio'
															value={choice}
															name={item.questionId}
														/>
														<label>{choice}</label>
														<br />
													</div>
												);
											})}
										</li>
									))}

									<br />
									<button type='button' onClick={submitTestHandler}>
										Submit test
									</button>
								</ul>
							) : (
								<div>
									<h4>I'm sorry, no questions for that category.</h4>
									<button type='button' onClick={submitTestHandler}>
										Back to category
									</button>
								</div>
							)}
						</div>
					)}
				</Fragment>
			)}
		</div>
	);
}

export default App;
