let container = document.getElementById("container");

fetch(
  "https://opentdb.com/api.php?amount=30&category=18&difficulty=medium&type=multiple"
)
  .then((Response) => Response.json())
  .then((Data) => {
    Data.results.forEach((quesObj) => {
      const question = document.createElement("div");
      question.setAttribute("class", "question"),
        container.appendChild(question);

      const question_text = document.createElement("h2");
      question_text.setAttribute("id", "question");
      question_text.textContent = quesObj.question;
      question.appendChild(question_text);

      let answers = quesObj.incorrect_answers;
      answers.push(quesObj.correct_answer);
      shuffle(answers);

      let letter = "A";
      answers.forEach((ans) => {
        const ansDiv = document.createElement("div");
        ansDiv.setAttribute("class", "choice-container");

        const pre = document.createElement("p");
        pre.textContent = letter;
        letter = String.fromCharCode(letter.charCodeAt(0) + 1);
        pre.setAttribute("class", "choice-prefix");

        const ansText = document.createElement("p");
        ansText.textContent = ans;
        ansText.setAttribute("class", "choice-text");

        ansDiv.appendChild(pre);
        ansDiv.appendChild(ansText);
        question.appendChild(ansDiv);
      });
      letter = "A";
    });
  })
  .catch((Error) => console.log(Error));

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
