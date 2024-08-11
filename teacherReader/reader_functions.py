import pygame
import speech_recognition as sr

from gtts import gTTS
import os


def pygame_speaker(audio):
    pygame.mixer.init()

    try:
        # Load and play the audio file
        pygame.mixer.music.load(audio)
        pygame.mixer.music.play()

        # Wait until the audio finishes playing
        while pygame.mixer.music.get_busy():
            continue
    finally:
        # Clean up Pygame mixer
        pygame.mixer.music.stop()
        pygame.mixer.quit()
        os.remove(audio)


def speak_bulgarian(text):
    tts = gTTS(text=text, lang='bg')
    tts.save('static_files/bulgarian.mp3')

    pygame_speaker('static_files/bulgarian.mp3')


