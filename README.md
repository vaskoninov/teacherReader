# An app to teach kids to read

It is a small app inspired by the through story of a kid struggling to read.

- currently it teaches them to read in Bulgarian
- easily it could be set to teach them read in English

## Major functions
- kids choose between different fairy tales to read
- each fairy tales is presented on the screen word by word
- while the kid reads, the Speech Recognition function checks what is read and prints it on the screen, it also checks
if it is the correct word
- once the correct word is read, the kid is allowed to go to the next word of the tale
- there is also a counter presenting the number of words correctly read - it is preserved even if the kid switches to a different
fairy tale
- there is also functionality that allows the kid to ask the program to read for them the current word

## Technologies used
- built with Django and React
  - has two main version:
  1. on Main branch - a complete Django version both backend and frontend
  2. on reactRest branch - a backend with Django Rest Framework and on the frontend with React

- the program uses the Webkit built-in SpeechRecognition functionality for listening the reading of the kid
- the program uses Google Translate provided Text-to-Speech functionality through a Python library ('gTTS') - through some experiments
it turned out that it provides better reading in Bulgarian