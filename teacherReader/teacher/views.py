from io import BytesIO

from django.http import HttpResponse
from django.views.generic import TemplateView, View
from gtts import gTTS

from teacherReader.teacher.helpers import create_deque_text

WORD_DEQUE = create_deque_text()


# Create your views here.

class TeacherReaderView(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        first_word = WORD_DEQUE[0]
        context["word"] = first_word
        return context


class NextWordView(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        WORD_DEQUE.rotate(-1)
        context["word"] = WORD_DEQUE[0]
        return context


class PreviousWordView(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        WORD_DEQUE.rotate(1)
        context["word"] = WORD_DEQUE[0]
        return context


class ReadTheWord(View):
    def get(self, request):
        text = request.GET.get('text', '')
        if not text:
            return HttpResponse("No text provided", status=400)

        # Use gTTS to convert text to speech
        tts = gTTS(text, lang='bg')  # Set language to Bulgarian
        audio_fp = BytesIO()
        tts.write_to_fp(audio_fp)
        audio_fp.seek(0)

        # Serve the audio file directly
        response = HttpResponse(audio_fp, content_type='audio/mpeg')
        response['Content-Disposition'] = 'inline; filename="speech.mp3"'
        return response
