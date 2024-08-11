import string
from collections import deque


def create_deque_text():
    with open('static_files/1.txt', 'r') as f:
        trans_table = str.maketrans('', '', '\ufeff—' + string.punctuation)
        text = deque(word.translate(trans_table) for line in f for word in line.split() if word.translate(trans_table))
        return text
