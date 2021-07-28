let container = document.getElementById("container");
let submit = document.getElementsByClassName('btn')[0];
let review = document.getElementsByClassName('review')[0];
let popResult = document.getElementById('popResult');
let result = document.getElementById('result');

let correct = [];
fetch(
  "https://opentdb.com/api.php?amount=15&category=18&difficulty=medium&type=multiple"
)
  .then((Response) => Response.json())
  .then((Data) => {
    Data.results.forEach((quesObj) => {
      correct.push(quesObj.correct_answer);
    
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

let grade = 0;

window.onclick = function (event) {
  let nodes = Array.prototype.slice.call(container.childNodes);
  console.log(nodes)
  let index = nodes.indexOf(event.target.parentElement.parentElement)-1;
  if(event.target.getAttribute("class") == 'choice-text'){
      if(event.target.textContent == correct[index]){
          event.target.style.backgroundColor = '#79FF79';
          grade++;
      }
      else event.target.style.backgroundColor='#ed413e';
  }    
  
  if (event.target.getAttribute("class") != "btn") {
    popResult.style.display = "none";
  }  
};

submit.onclick = function(){
  popResult.style.display = "block";
  result.textContent = 'Youre Grade: '+grade+'/15';
}