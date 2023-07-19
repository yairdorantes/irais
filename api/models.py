from django.db import models

# Create your models here.


class MyForm(models.Model):
    name = models.CharField(max_length=100, verbose_name="name")
    movie = models.CharField(max_length=100, verbose_name="movie")
    character = models.CharField(max_length=100, verbose_name="character")
    song_link = models.URLField(verbose_name="song_link")

    def __str__(self) -> str:
        return self.name
