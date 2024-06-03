const questionInput = document.getElementById('question');
const askButton = document.getElementById('ask');
const outputDiv = document.getElementById('output');
const h1 = document.querySelector('h1');
const body = document.body
const container = document.querySelector('.container');
const responses = [
    "It is certain.",
    "It is decidedly so.",
    "Without a doubt.",
    "Yes, definitely.",
    "You may rely on it.",
    "As I see it, yes.",
    "Most likely.",
    "Outlook good.",
    "Yes.",
    "Signs point to yes.",
    "Reply hazy, try again.",
    "Ask again later.",
    "Better not tell you now.",
    "Cannot predict now.",
    "Concentrate and ask again.",
    "Don't count on it.",
    "My reply is no.",
    "My sources say no.",
    "Outlook not so good.",
    "Very doubtful."
];

const annoyedResponses = [
    "I already answered that.",
    "Didn't you hear me the first time?",
    "Are you even listening?",
    "I'm getting tired of repeating myself.",
    "Can we move on to a different question?",
    "I thought I made myself clear.",
    "Do you have a short-term memory problem?",
    "I'm starting to get annoyed.",
    "Seriously, ask something else.",
    "I'm not going to keep answering the same question."
];

const angryResponses = [
    "Enough! I'm done answering that question!",
    "I'm getting really frustrated with you!",
    "Stop asking the same thing over and over!",
    "You're testing my patience!",
    "I'm about to lose my cool!",
    "I'm not going to respond to that anymore!",
    "You're really pushing my buttons!",
    "I'm getting angry now!",
    "I'm warning you, stop repeating yourself!",
    "That's it, I'm done! Ask something else or else!"
];

const sassyResponses = [
    "Seriously? That's the best question you could come up with?",
    "Wow, how original. Not.",
    "I'm not even going to dignify that with a response.",
    "Are you trying to be funny? Because it's not working.",
    "I've heard better questions from a rock.",
    "Did you put any thought into that question at all?",
    "I'm rolling my eyes so hard right now.",
    "That's a terrible question, and you should feel bad.",
    "I'm judging you so hard for that question.",
    "I'm going to need you to try a little harder next time."
];

const sadResponses = [
    "I'm feeling a little down today.",
    "I'm not in the best mood right now.",
    "I'm having a bit of a rough day.",
    "I'm feeling a little blue.",
    "I'm not feeling my best today.",
    "I'm a little under the weather.",
    "I'm feeling a little melancholy.",
    "I'm not in the highest of spirits.",
    "I'm feeling a little gloomy.",
    "I'm not in the most cheerful of moods."
];

const happyResponses = [
    "I'm feeling great today!",
    "I'm in a fantastic mood!",
    "I'm on cloud nine!",
    "I'm feeling absolutely wonderful!",
    "I'm in high spirits today!",
    "I'm feeling positively radiant!",
    "I'm having a fantastic day!",
    "I'm feeling absolutely delightful!",
    "I'm in a joyous mood!",
    "I'm feeling absolutely ecstatic!"
];

const flirtyResponses = [
    "Hey there, good-looking.",
    "Did it hurt when you fell from heaven?",
    "Are you a magician? Because whenever I look at you, everyone else disappears.",
    "Do you have a map? Because I keep getting lost in your eyes.",
    "Is your name Google? Because you have everything I've been searching for.",
    "Are you a camera? Because every time I look at you, I smile.",
    "Do you have a Band-Aid? Because I just scraped my knee falling for you.",
    "If you were a vegetable, you'd be a cute-cumber.",
    "Do you have a sunburn, or are you always this hot?",
    "Can I follow you home? Cause my parents always told me to follow my dreams."
];

let lastQuestion = "";
let repeatCount = 0;
let isAngry = false;
let angryCountdown = 0;
let currentMood = "";

function setMood(mood) {
    currentMood = mood;
    switch (mood) {
        case "angry":
            body.style.backgroundColor = "#330000";
            container.style.backgroundColor = "#330000";
            container.style.boxShadow = "0 0 20px rgba(255, 0, 0, 0.5)";
            h1.style.color = "#ff3333";
            outputDiv.style.color = "#ff3333";
            questionInput.style.color = "#ff3333";
            questionInput.style.borderColor = "#ff3333";
            break;
        case "sad":
            body.style.backgroundColor = "#333333";
            container.style.backgroundColor = "#333333";
            container.style.boxShadow = "0 0 20px rgba(153, 153, 153, 0.5)";
            h1.style.color = "#cccccc";
            outputDiv.style.color = "#cccccc";
            questionInput.style.color = "#cccccc";
            questionInput.style.borderColor = "#cccccc";
            break;
        case "happy":
            body.style.backgroundColor = "#003333";
            container.style.backgroundColor = "#003333";
            container.style.boxShadow = "0 0 20px rgba(0, 255, 0, 0.5)";
            h1.style.color = "#33ff33";
            outputDiv.style.color = "#33ff33";
            questionInput.style.color = "#33ff33";
            questionInput.style.borderColor = "#33ff33";
            break;
        case "flirty":
            body.style.backgroundColor = "#330033";
            container.style.backgroundColor = "#330033";
            container.style.boxShadow = "0 0 20px rgba(255, 0, 255, 0.5)";
            h1.style.color = "#ff33ff";
            outputDiv.style.color = "#ff33ff";
            questionInput.style.color = "#ff33ff";
            questionInput.style.borderColor = "#ff33ff";
            break;
        default:
            body.style.backgroundColor = "#0d0d0d";
            container.style.backgroundColor = "#1a1a1a";
            container.style.boxShadow = "0 0 20px rgba(0, 0, 0, 0.5)";
            h1.style.color = "#3498db";
            outputDiv.style.color = "#3498db";
            questionInput.style.color = "#3498db";
            questionInput.style.borderColor = "#3498db";
            break;
    }
}

function resetMood() {
    setMood("");
}

function getRandomMood() {
    const moods = ['angry', 'sad', 'happy', 'flirty'];
    const randomIndex = Math.floor(Math.random() * moods.length);
    return moods[randomIndex];
}

function getRandomResponse(responses) {
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
}

askButton.addEventListener('click', () => {
    const question = questionInput.value.trim();
    if (question) {
        outputDiv.classList.add('generating');
        setTimeout(() => {
            if (question === lastQuestion) {
                repeatCount++;
                if (isAngry) {
                    if (angryCountdown > 0) {
                        angryCountdown--;
                        const response = getRandomResponse(angryResponses);
                        outputDiv.textContent = response;
                    } else {
                        isAngry = false;
                        resetState();
                        const response = getRandomResponse(responses);
                        outputDiv.textContent = response;
                    }
                } else if (repeatCount >= 5) {
                    isAngry = true;
                    angryCountdown = 3;
                    setMood("angry");
                    const response = getRandomResponse(angryResponses);
                    outputDiv.textContent = response;
                } else if (repeatCount >= 3) {
                    const response = getRandomResponse(annoyedResponses);
                    outputDiv.textContent = response;
                } else {
                    const response = getRandomResponse(responses);
                    outputDiv.textContent = response;
                }
            } else {
                lastQuestion = question;
                repeatCount = 0;
                isAngry = false;
                const response = getRandomResponse(responses);
                outputDiv.textContent = response;
                resetMood();
            }

            // Add a random chance to change the mood
            const randomNumber = Math.random();
            if (randomNumber < 0.1) {
                const mood = getRandomMood();
                setMood(mood);
                const response = getRandomResponse([...responses, ...sassyResponses, ...sadResponses, ...happyResponses, ...flirtyResponses]);
                outputDiv.textContent = response;
            }

            outputDiv.classList.remove('generating');
            questionInput.value = '';
        }, 1000);
    } else {
        outputDiv.textContent = 'Please ask a question.';
    }
});

function resetState() {
    lastQuestion = "";
    repeatCount = 0;
    isAngry = false;
    angryCountdown = 0;
    resetMood();
}
