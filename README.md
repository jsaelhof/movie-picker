## The Movie Decider 4000 - A Next.js Experiment App

During the lockdowns in 2020, our family was watching more movies but we could never decide which movie to watch. I wanted to play around with Next.js so I wrote up a small app that stores a list of movies and randomly picks one. Over time, this project has grown to include the ability to switch DB's (so that we can have a list for grown up movies and one for movies with the kids), integration with OMDB and TMDB API's to pull in data like genre and runtime, and provide a number of extra functions like finding trailers, reviews, ratings, IMDB info, streaming info and more.

##

### Pick Screen

Displays the movie that was selected, including synopis, ratings, streaming source, trailers and more. Movies can be randomly chosen from the entire list or from a smaller set limited by runtime.

![image](https://user-images.githubusercontent.com/7939225/190296239-2389190e-13c5-4299-b39f-2278ec2000f6.png)

##

### Main List

Displays the list of movies we want to watch.

![image](https://user-images.githubusercontent.com/7939225/190295808-33e363ed-05e6-47ff-8016-b832a275f63e.png)

##

### Movie Detail

Movies can be hovered to show the most important information (streaming source, ratings, runtime), and quick actions (edit, mark watched, lock, delete)

![image](https://user-images.githubusercontent.com/7939225/191169481-24e58f5b-5e8a-430e-bebf-8bfa902d1e1b.png)

## 

### Fully Responsive

Between movie nights, we'll often hear about ones we would like to see. It quickly became important to have the ability to pull out my phone and add it to the list on the go.

![image](https://user-images.githubusercontent.com/7939225/191165858-e019830f-fa8d-483c-9393-465a53039d53.png) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ![image](https://user-images.githubusercontent.com/7939225/191167099-2dddb8af-c6dc-4e17-af09-433b0e8cfb3b.png)


##

### Watched Movies

A historical view of the movies we have watched.

![image](https://user-images.githubusercontent.com/7939225/191163364-0790725c-4069-4077-9717-87758b2c6c04.png)

##

### Set the Date

When a movie is marked as "watched", the date is automatically set to the current day. If I forget to mark it for a day or two, I can adjust the date manually.

![image](https://user-images.githubusercontent.com/7939225/191164423-ed7b91c6-ec77-44f3-b74f-77eb95ead433.png)

##

### Add Movie with OMDB Integration

Adding movies is much simpler now. Just search the name and a list of matching movies is displayed. Clicking the poster will auto-fill all the details for the movie and even check where it is currently streaming. (Note: This UI needs a visual upgrade to be match the rest of the app)

![image](https://user-images.githubusercontent.com/7939225/190296813-fa9928e5-cc43-4980-8303-311b3d1c88a5.png)

