import string

from teacherReader.teacher.models import FairyTaleText


def create_list_text():
    with open('static_files/1.txt', 'r') as f:
        trans_table = str.maketrans('', '', '\ufeff—' + string.punctuation)
        return [word.translate(trans_table) for line in f for word in line.split() if word.translate(trans_table)]


def prepare_fairy_tale(slug):
    tale = FairyTaleText.objects.get(slug=slug)
    trans_table = str.maketrans('', '', '\ufeff—' + string.punctuation)
    text = tale.text.split()
    return {"text": [word.translate(trans_table) for word in text if word.translate(trans_table)],
            "title": tale.title}
