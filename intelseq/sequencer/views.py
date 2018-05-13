from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse

from .models import User, UserPattern, MasterPattern

from django.views.generic.base import TemplateView

from django.http import JsonResponse


# Create your views here.
from django.views import generic


class Index(TemplateView):
    model = MasterPattern
    template_name = 'sequencer/index.html'

def fetchPatternData(request):
    # if this is a POST request we need to process the form data
    if request.method == 'POST':
        pattern_data = request.POST['raw_pattern']
        tempo_data = request.POST['tempo']
        rating_data = request.POST['rating']
        rep_data = int(request.POST['repetition'])
        sound_data = request.POST['sound']
        octave_data = request.POST['octave']
        chord_data = request.POST['chord']

        if rating_data == 'positive':
            like_data = 1
            dislike_data = 0

        elif rating_data == 'negative':
            like_data = 0
            dislike_data = 1

        mp = MasterPattern(raw_pattern=pattern_data, repetition=rep_data, chord=chord_data, octave=octave_data, sound=sound_data, bpm=tempo_data, total_likes=like_data, total_dislikes=dislike_data ) 
        mp.save()

        rtxt = "Saved pattern {0} with tempo {1} to database, with a {2} rating.".format(pattern_data, tempo_data, rating_data)

    return HttpResponse(rtxt)
