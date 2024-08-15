let recognition;
let recognizing = false;
let numberWords = 0;

if (!('webkitSpeechRecognition' in window)) {
    alert("Your browser doesn't support the Web Speech API. Please try this in Chrome.");
} else {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;  // Keep recognizing speech until stopped
    recognition.interimResults = true;  // Show interim results while the user is speaking
    recognition.lang = 'bg-BG';  // Set the language

    recognition.onstart = function () {
        recognizing = true;
        document.getElementById('speech-btn').innerText = "Спри да четеш";
    };

    recognition.onend = function () {
        recognizing = false;
        document.getElementById('speech-btn').innerText = "Започни да четеш";

        if (document.getElementById('currentWord').innerText.toLowerCase() === document.getElementById('recognized-text').innerText) {
            // alert('Добра работа!');
            // guessedWordsCount()
            getCorrectWordsNumber();
            enableButton();
            goodAlert();
            increaseSessionGuessedWords()
        }

    };

    recognition.onresult = function (event) {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = 0; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript + ' ';
            } else {
                interimTranscript += transcript;
            }
        }

        document.getElementById('recognized-text').innerText = finalTranscript || interimTranscript;
    };


    recognition.onerror = function (event) {
        console.error('Speech recognition error detected: ', event.error);
        alert('Error occurred in speech recognition: ' + event.error);
    };
}

function toggleRecognition() {
    if (recognizing) {
        recognition.stop();
        return;
    }
    recognition.start();
}

function readWord() {
    const wordToRead = document.getElementById('currentWord').innerText

    fetch(`/read-word/?text=${encodeURIComponent(wordToRead)}`)
        .then(response => response.blob())
        .then(blob => {
            const audioUrl = URL.createObjectURL(blob);
            const audioPlayer = document.getElementById('audio-player');
            audioPlayer.src = audioUrl;
            audioPlayer.style.display = 'none';
            audioPlayer.play();
        })
        .catch(error => console.error('Error:', error));
}

function getCorrectWordsNumber() {
    ++numberWords
    document.getElementById("numberOfWords").innerText = numberWords.toString()

}

function enableButton() {
    console.log('Condition met, enabling button');
    const button = document.getElementById('nextWord')
    button.disabled = false;
    console.log('Button disabled state:', button.disabled);
}


function goodAlert() {
    const divAlert = document.getElementById('goodAlert')
    divAlert.style.display = 'block'
}

// function guessedWordsCount() {
//     const guessedWord = document.getElementById('guessedWords')
//     if (guessedWord.innerText.toString() === '0') {
//         guessedWord.innerText = '1'
//     }
// }


function increaseSessionGuessedWords() {
    const csrfToken = document.cookie.split('; ').find(row => row.startsWith('csrftoken')).split('=')[1];
    const numberOfWords = document.getElementById('numberOfWords')
    if (Number(numberOfWords.innerText) === 1) {
        const guessed = document.getElementById('guessedWords')
        guessed.innerText = (Number(guessed.innerText) + 1).toString()

        fetch('/update/', {
            method: "POST",
            headers: {
                "Content-type": 'application/json',
                "X-CSRFToken": csrfToken,
            },
            body: JSON.stringify({'update-words': true})
        })
            .then(response => response.json())
            .then(data => {
                console.log("Updated:", data)
            })
            .catch(error => {
                console.log('Error:', error)
            })
    }
}