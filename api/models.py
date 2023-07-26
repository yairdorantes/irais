from email.mime import image
from re import T
from django.db import models

# Create your models here.


class MyForm(models.Model):
    name = models.CharField(max_length=100, verbose_name="name")
    movie = models.CharField(max_length=100, verbose_name="movie")
    character = models.CharField(max_length=100, verbose_name="character")
    song_link = models.URLField(verbose_name="song_link")
    image = models.TextField(verbose_name="image", null=True, default="")
    video = models.URLField(verbose_name="video", null=True)
    person_data = models.CharField(
        verbose_name="person_data", null=True, max_length=250
    )

    def __str__(self) -> str:
        return self.name
