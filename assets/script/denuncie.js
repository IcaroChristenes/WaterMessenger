let currentIndex = 0;
let questions = [
    {
        question: "Qual é a porcentagem da população local que tem acesso seguro a água potável?",
        answers: [
            "90%",
            "75%",
            "50%",
            "30%"
        ]
    },
    {
        question: "Quanto investimento público foi direcionado para melhorias no sistema de saneamento básico nos últimos 5 anos?",
        answers: [
            "10%",
            "25%",
            "50%",
            "75%"
        ]
    },
    {
        question: "Quantas comunidades locais estão atualmente sofrendo com surtos de doenças transmitidas pela água?",
        answers: [
            "Nenhuma",
            "Poucas",
            "Algumas",
            "Muitas"
        ]
    },
    {
        question: "Qual é a proporção de crianças que não têm acesso a instalações sanitárias adequadas em escolas públicas na região?",
        answers: [
            "10%",
            "25%",
            "50%",
            "75%"
        ]
    },
    {
        question: "Em quantos lares locais não há acesso a um sistema de esgoto seguro?",
        answers: [
            "5%",
            "15%",
            "30%",
            "50%"
        ]
    },
    {
        question: "Quantas indústrias da região são conhecidas por poluir diretamente os recursos hídricos locais?",
        answers: [
            "Nenhuma",
            "Poucas",
            "Algumas",
            "Muitas"
        ]
    },
    {
        question: "Qual é a taxa de mortalidade infantil relacionada a doenças transmitidas pela água na região?",
        answers: [
            "Baixa",
            "Moderada",
            "Alta",
            "Muito alta"
        ]
    },
    {
        question: "Qual é a extensão da contaminação dos corpos d'água locais por produtos químicos industriais?",
        answers: [
            "Baixa",
            "Moderada",
            "Alta",
            "Muito alta"
        ]
    },
    {
        question: "Quantas horas por dia, em média, os residentes locais precisam gastar para obter água potável?",
        answers: [
            "Menos de 1 hora",
            "1-2 horas",
            "2-4 horas",
            "Mais de 4 horas"
        ]
    },
    {
        question: "Em quantas residências locais há relatos frequentes de problemas de saúde relacionados à qualidade da água?",
        answers: [
            "Poucas",
            "Algumas",
            "Muitas",
            "A maioria"
        ]
    }
];


let answers = [];

const questionElement = document.getElementById("question_text");
const answersElement = document.getElementById("answers_container");

function showQuestion() {
    const currentQuestion = questions[currentIndex];
    questionElement.textContent = currentQuestion.question;

    answersElement.innerHTML = "";

    currentQuestion.answers.forEach((answer, index) => {
        const input = document.createElement("input");
        input.type = "radio";
        input.className = "form-radio";
        input.name = "answer_option";
        input.id = "answer_" + index;
        input.value = index + 1;

        const label = document.createElement("label");
        label.htmlFor = "answer_" + index;
        label.textContent = answer;

        const div = document.createElement("div");
        div.className = "label-container";
        div.appendChild(input);
        div.appendChild(label);

        answersElement.appendChild(div);
    });
}

function nextQuestion() {
    const answer = document.querySelector("input[name=answer_option]:checked");
    if (answer) {
        answers.push(answer.value);
        currentIndex++;
        if (currentIndex < questions.length) {
            setTimeout(() => {
                showQuestion();
            }, 500);
        } else {
            const quizContainer = document.getElementById("quiz_container");
            quizContainer.innerHTML = "";

            const fieldset = document.createElement("fieldset");
            const legend = document.createElement("legend");
            legend.textContent = "Questionário";
            const endParagraph = document.createElement("p");
            endParagraph.textContent = "Fim";
            fieldset.appendChild(legend);
            fieldset.appendChild(endParagraph);
            quizContainer.appendChild(fieldset);
        }
    } else {

    }
}

answersElement.addEventListener("click", function (event) {
    if (event.target.matches("input[type=radio]")) {
        nextQuestion();
    }
});

showQuestion();


function sendDenounce() {
    const inputsFilled = Array.from(document.querySelectorAll('.form-input')).every(input => input.value.trim() !== '');

    if (!inputsFilled) {
        alert('preencha todos os campos do formulário');
        return;
    };
    if (questions.length > answers.length) {
        alert('você não terminou de responder todas as perguntas');
        return;
    };
    const form = Array.from(document.querySelectorAll('.form-input'))
        .map(input => ({ [input.getAttribute('name')]: input.value.trim() }));


    let total = 0;

    for (let i = 0; i < answers.length; i++) {
        total += parseInt(answers[i]);
    };

    const body = {
        answers,
        form,
        media: (total / questions.length)
    };


    $.post("http://localhost:8080/report", body, (data, status) => {

        alert('Sua denúncia foi enviada com sucesso, espere no inferno');

        window.location.href = '/';

    });
};