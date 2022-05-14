## The Movie Decier 4000 - A Next.js Experiment App

I wanted to play around with Next.js and we could never decide which movie to watch from our list, so I wrote up an app that stores a list of movies and randomly picks one. Over time, this project has grown to include the ability to switch DB's (so that we can have a list for grown up movies and one for movies with the kids), integrate with OMDB to pull in data like genre and runtime, and provide a number of extra functions like finding trailers, reviews, ratings, IMDB info, streaming info and more.

##

### Pick Screen

Displays what movie we're watching, including synopis, ratings, streaming source, trailers and more.

![image](https://user-images.githubusercontent.com/7939225/145155527-07513130-397f-4a1f-a3a6-0567b9bffaec.png)

##

### Main List

Displays the list of movies we want to watch.

![image](https://user-images.githubusercontent.com/7939225/145154011-dcef3ea2-a909-4fc9-b110-bb97a9789116.png)

##

### Movie Detail

Movies can be hovered to show additional information (streaming source, ratings, year, genre), actions (mark watched, lock, delete) and external resources (imdb, tmdb, common sense media etc)

![image](https://user-images.githubusercontent.com/7939225/145154177-55ec3b3d-2b1c-4a56-9718-7944997ac31b.png)

##

### Add Movie with OMDB Integration

Adding movies is much simpler now. Type in the name and a list of matching movies will be displayed. Click the poster to auto-fill all the details for the movie or enter them manually.

![image](https://user-images.githubusercontent.com/7939225/145154391-f184d01e-f9f8-4f31-b655-78f8f42762a4.png)
