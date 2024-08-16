let recognition;
let recognizing = false;
let correct_word = false;

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
            alert('Добра работа!');
            // guessedWordsCount()
            // getCorrectWordsNumber();
            // enableButton();
            // goodAlert();
            // increaseSessionGuessedWords()
            correct_word = true;
            recognition.resolvePromise(correct_word)
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

export function toggleRecognition() {
    return new Promise((resolve) => {
        recognition.resolvePromise = resolve;

        if (recognizing) {
            recognition.stop();
        } else {
            recognition.start();
        }
    });

}

export function readWord() {
    const wordToRead = document.getElementById('currentWord').innerText

    fetch(`http://localhost:8000/read-word/?text=${encodeURIComponent(wordToRead)}`)
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
