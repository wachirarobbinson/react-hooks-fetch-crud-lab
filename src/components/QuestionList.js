import React, { useState, useEffect } from "react";
import { fetch } from "whatwg-fetch";
import QuestionItem from "./QuestionItem";

function QuestionList() {
	const [questions, setQuestions] = useState([]);

	const FetchFn = () => {
		fetch("http://localhost:4000/questions")
			.then((res) => res.json())
			.then((data) =>
				setQuestions(
					data.map((q) => {
						return (
							<QuestionItem
								key={q.id}
								handleChange={handleChange}
								question={q}
								deleted={deleted}
							/>
						);
					})
				)
			);
	};

	useEffect(() => {
		FetchFn();
	}, []);

	function deleted(id) {
		fetch(`http://localhost:4000/questions/${id}`, { method: "DELETE" }).then(
			() => FetchFn()
		);
	}

	function handleChange(e, id) {
		fetch(`http://localhost:4000/questions/${id}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				correctIndex: parseInt(e.target.value),
			}),
		});
	}

	return (
		<section>
			<h1>Quiz Questions</h1>
			<ul>
				{/* display QuestionItem components here after fetching */}
				{questions}
			</ul>
		</section>
	);
}

export default QuestionList;