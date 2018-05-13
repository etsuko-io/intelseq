from django.db import models

# Create your models here.
from django.db import models

import datetime


class User(models.Model):
    username = models.CharField(unique=True, max_length=50)
    reg_date = models.DateTimeField('registration date')
    date_of_birth = models.DateField(default=datetime.date.today)

    def __str__(self):
        return self.username


class MasterPattern(models.Model):
    raw_pattern = models.CharField(max_length=128)
    repetition = models.IntegerField()
    chord = models.CharField(max_length=20)
    octave = models.CharField(max_length=3)
    sound = models.CharField(max_length=50)
    bpm = models.IntegerField()
    total_likes = models.IntegerField(default=0)
    total_dislikes = models.IntegerField(default=0)

    def __str__(self):
        return self.raw_pattern



class UserPattern(models.Model):
    master_id = models.ForeignKey(MasterPattern, on_delete=models.CASCADE)
    times_listened = models.IntegerField(default=0)
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)

    def __str__(self):
        return "entry {0} linked to pattern {1}".format(self.pk, self.master_id)