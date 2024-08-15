import json
from collections import deque
from io import BytesIO

from django.http import HttpResponse, JsonResponse
from django.views.generic import TemplateView, View, ListView
from gtts import gTTS

from teacherReader.teacher.fairytale import FairyTale
from teacherReader.teacher.helpers import prepare_fairy_tale
from teacherReader.teacher.models import FairyTaleText


class FairyTaleChooser(ListView):
    template_name = 'chooser.html'
    model = FairyTaleText

    context_object_name = 'texts'

    def get_context_data(self, **kwargs):
        context = super().get_context_data()

        # To clean possible leftovers in Session
        tale = FairyTale(self.request)
        tale.clear_fairytale()
        return context


class NewFairyTale(ListView):
    template_name = 'choose_another_tale.html'
    model = FairyTaleText
    context_object_name = 'texts'


# Create your views here.

class TeacherReaderView(TemplateView):
    template_name = 'fairytale.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        # Prepare the new tale
        tale = FairyTale(self.request)

        # Load the tale and prepare learning
        current_fairytale = prepare_fairy_tale(slug=self.kwargs['slug'])
        tale.add_fairytale(current_fairytale['text'])
        tale.previous_words = []
        first_word = tale.fairytale[0]

        # Send data to template
        self.request.session['title'] = current_fairytale['title']
        context["word"] = first_word
        context['title'] = self.request.session['title']
        context['guessed_words'] = self.request.session.get('guessed_words', 0)
        self.request.session['guessed_words'] = context['guessed_words']
        context['slug'] = self.kwargs['slug']

        return context


class NextWordView(TemplateView):
    template_name = 'fairytale.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        tale = FairyTale(self.request)

        context["word"] = tale.next_word()
        context['title'] = self.request.session['title']
        # self.request.session['guessed_words'] += 1
        context['guessed_words'] = self.request.session['guessed_words']
        context['slug'] = self.kwargs['slug']
        return context


class PreviousWordView(TemplateView):
    template_name = 'fairytale.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        tale = FairyTale(self.request)

        context["word"] = tale.previous_word()
        print(tale.previous_word())
        context['title'] = self.request.session['title']
        context['slug'] = self.kwargs['slug']
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


class UpdateGuessedWordsSession(View):

    def post(self, request):
        print("Received POST data:", request.POST)
        data = json.loads(request.body)
        if data.get('update-words'):
            guessed_words = request.session.get('guessed_words', 0)
            request.session['guessed_words'] = guessed_words + 1
            request.session.modified = True
            return JsonResponse({'status': 'success', 'guessed_words': request.session['guessed_words']})
        return JsonResponse({'status': 'failed'}, status=400)
