import React, { Fragment, useState, useEffect } from 'react';
import API from '../../api';
// import * as math from '../../utils/math';

function App() {
	const [data, setData] = useState([]);
	const [chapter, setChapter] = useState(151);
	const [url, setUrl] = useState(
		'quiz/questions/random?amount=1&chapter=151&difficulty=10'
	);
	const [isLoading, setIsLoading] = useState(false);
	const [quizNumber, setQuizNumber] = useState('');
	const [difficulty, setDifficulty] = useState('1');
	const [doesHaveData, setDoesHaveData] = useState(true);
	const [doesTestStarted, setDoesTestStarted] = useState(false);

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
		setChapter(e.target.value);
	};

	const difficultyHandler = e => {
		setDifficulty(e.target.value);
	};

	return (
		<Fragment>
			{!doesTestStarted ? (
				<div>
					<br />
					<br />
					<div>
						<label>Select Chapter</label> <br />
						<select value={chapter} onChange={selectChapterHandler}>
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
								{`${data[data.length - 1].chapter - 150}: ${
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
									<input
										type='radio'
										value={item.choices[0]}
										name={item.questionId}
									/>
									<label>{item.choices[0]}</label>
									<br />
									<input
										type='radio'
										value={item.choices[1]}
										name={item.questionId}
									/>
									<label>{item.choices[1]}</label>
									<br />
									<input
										type='radio'
										value={item.choices[2]}
										name={item.questionId}
									/>
									<label>{item.choices[2]}</label>
									<br />
									<input
										type='radio'
										value={item.choices[3]}
										name={item.questionId}
									/>
									<label>{item.choices[3]}</label>
									<br />
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
	);
}

export default App;
