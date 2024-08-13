from collections import deque


class FairyTale:
    def __init__(self, request):
        self.session = request.session
        self.request = request

        fairytale = self.session.get('fairytale')
        previous_words = self.session.get('previous_words')

        if 'fairytale' not in self.session:
            fairytale = self.session['fairytale'] = []

        if 'previous_words' not in self.session:
            previous_words = self.session['previous_words'] = []

        self.fairytale = deque(fairytale)
        self.previous_words = previous_words

    def next_word(self):
        if self.fairytale:
            self.previous_words.append(self.fairytale.popleft())

            self.session['previous_words'] = self.previous_words
            self.session['fairytale'] = list(self.fairytale)
            self.session.modified = True

        return self.fairytale[0] if self.fairytale else "Край на приказката"

    def previous_word(self):
        if self.previous_words:
            previous_word = self.previous_words.pop()
            self.fairytale.appendleft(previous_word)

            self.session['previous_words'] = self.previous_words
            self.session['fairytale'] = list(self.fairytale)

            self.session.modified = True
        return self.fairytale[0] or None

    def add_fairytale(self, tale):
        self.fairytale = list(tale)

        self.session['fairytale'] = self.fairytale

        self.session.modified = True
        return self.fairytale

    def clear_fairytale(self):

            # Clear specific keys from the session
        if 'fairytale' in self.session:
            del self.session['fairytale']
        if 'previous_words' in self.session:
            del self.session['previous_words']
        self.session.modified = True
