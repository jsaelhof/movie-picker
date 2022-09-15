## The Movie Decier 4000 - A Next.js Experiment App

During the lockdowns in 2020, our family was watching more movies but we could never decide which movie to watch from our list. I wanted to play around with Next.js so I wrote up a small app that stores a list of movies and randomly picks one. Over time, this project has grown to include the ability to switch DB's (so that we can have a list for grown up movies and one for movies with the kids), integrate with OMDB and TMDB API's to pull in data like genre and runtime, and provide a number of extra functions like finding trailers, reviews, ratings, IMDB info, streaming info and more.

##

### Pick Screen

Displays what movie we're watching, including synopis, ratings, streaming source, trailers and more.

![image](https://user-images.githubusercontent.com/7939225/190296239-2389190e-13c5-4299-b39f-2278ec2000f6.png)

##

### Main List

Displays the list of movies we want to watch.

![image](https://user-images.githubusercontent.com/7939225/190295808-33e363ed-05e6-47ff-8016-b832a275f63e.png)

##

### Movie Detail

Movies can be hovered to show additional information (streaming source, ratings, year, genre), actions (mark watched, lock, delete) and external resources (IMDB, TMDB, Common Sense Media etc)

![image](https://user-images.githubusercontent.com/7939225/190296510-8d985592-0c84-4c98-829b-4ddad7e9b22b.png)

##

### Add Movie with OMDB Integration

Adding movies is much simpler now. Type in the name and a list of matching movies will be displayed. Click the poster to auto-fill all the details for the movie or enter them manually.

![image](https://user-images.githubusercontent.com/7939225/190296813-fa9928e5-cc43-4980-8303-311b3d1c88a5.png)

