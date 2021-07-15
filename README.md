### Next.js Experiment App

I wanted to play around with Next.js and we could never decide which movie to watch from our list, so I wrote up an app that stores a list of movies and randomly picks one. Over time, this project has grown to include the ability to switch DB's (so that we can have a list for grown up movies and one for movies with the kids), integrate with OMDB to pull in data like genre and runtime, and provide a number of extra functions like finding trailers, reviews, ratings, IMDB info, streaming info and more.

This app doesn't have a very pretty UI. It was supposed to be a quick and dirty project to learn Next.js coding. I've tossed Material-UI on it to provide some basic UI controls. Personal projects just never get enough time.

It was built using a simple file-based db because I wasn't focusing as much on a deployed, robust solution. Now that this has grown, I plan to host it somewhere and connect it to an actual database.

###### Main List

![image](https://user-images.githubusercontent.com/7939225/112165460-5fa5af00-8bb4-11eb-85ff-c56d42b93993.png)

###### More Actions

![image](https://user-images.githubusercontent.com/7939225/112165689-94196b00-8bb4-11eb-8d0d-9631d646ec0d.png)

###### Add Movie with OMDB Integration

![image](https://user-images.githubusercontent.com/7939225/112165877-c1feaf80-8bb4-11eb-991e-9f930dd53bfe.png)

#### UI TODO:

- local storage for last db used?
- Pick should not filter the list. Pop it up in a modal or insert a section under the button. Use a short animation of random selections before showing the choice.
- Restrict pick to a certain genre.
- Mobile view
- Idea: Highlight/filter long and short movies on rollover? Probably not needed.
- Use TheMovieDatabase API to get a list of places the movie is streaming from. Look for services I have access to. Need to figure out how to tie this into my search box with OMDB.
- Add React Spring. Use it to delay displaying of the "Searching..." in the Search Movie Dialog.
- When picking, if you pick again (say within 5 minutes or in the same session), it should not pick that movie again.
- Add a context for state like the split button being open
- Add movie ratings
- Add an option to queue a movie as "on deck". Maybe a separate list. This would be for movies we sure want to watch next. The pick would still just choose from all the unwatched movies.
- ~~Add an option to alter the date of a watched movie.~~
- ~~Click a non-null source to launch the stream action~~
- ~~Add Documentary genre~~
- ~~Move less used actions to "More Actions" menu~~
- ~~Add search on Common Sense Media~~
- ~~Need to move OMDB comm stuff to an endpoint and just use axios to call it directly (no need for the comm).~~
- ~~Need to protect the API keys in .env.local so they aren't in github and they arent exposed on the client. My omdb endpoint should use axios to call omdb internally which should keep the API key secret.~~
- ~~Extract API url/key for OMDB from search movie dialog.~~
- ~~Add a search from OMDB to get a list of movies to match from based on a title.~~
- ~~Focus on the title field after clicking add movie~~
- ~~Move db name and buttons into a subheader under the title bar. DB on the left, buttons on the right.~~
- ~~Make DB name a combobox and allow switching~~
- ~~Add a proper error dialog and haandling~~
- ~~Create a centralized comm module for all requests to go through. Handle errors in one place, provide a callback for success. Maybe provide an option for showing a toast on success? Undo?~~
- ~~Add a mute/disabled state to prevent a movie from being picked until reactivated.~~
- ~~Switch to Axios.~~
- ~~Need to build a DB request wrapper. Too much duplication.~~
- ~~Undo for move to watched list action. Use toast.~~
- ~~Adding. Should this be a modal? A "drawer" space that slides open under the toolbar?~~
- ~~Extract an Action component that takes an Icon and a handler~~
- ~~Editing. Using "Add" with new info doesn't work to fix a title. Runtime also gets overwritten if not provided.~~
- ~~Sort by name/date added/length/genre.~~
- ~~Restrict pick to 100 minutes or less.~~
- ~~Restrict pick to 125 minutes or less.~~
- ~~Restrict pick to 125 minutes or more (long movie night).~~
- ~~No Source, search for a torrent~~
- ~~Genre should be a dropdown of a few broad genres.~~
- ~~Confirm delete~~ or provide an undo
- ~~Watched list~~
- ~~Confirm delete on watched list~~
- ~~Refactor the list component(s)... move cells to separate component folders, move watched list to separate folder~~
- ~~Source search should probably just be another action if applicable~~
- ~~Action tooltips~~
- ~~Icons for split button options~~

#### GraphQL ToDo

- ~~Get Pick working~~
- ~~Filters for picking (resolver)~~
- ~~Extract queries into separate file(s)~~
- ~~Finish removing axios~~
- ~~Clean up rest endpoints...delete?~~
- ~~Move resolvers and schema out of pages dir and into graphql dir. Rename indexes as resolvers.js and schema.js~~

#### DB TODO:

- Might be best to separate the add endpoint from being used for editing. Or rename it to update. Or just make one callled upsert since thats what it does,
- Track how many times a movie has been "repicked"...might need a "Not tonight" button. Might be able to do something interesting with this data.
- Pull in a movie rating? Length? Genre? Synopsis? Can get these from the moviedb api but I'd need to get results based on title and then either let you choose or filter results for an exact match of the title? Could be messy but would be really nice.
- State needs to be reworked a bit. Passing a lot of functions into display components. Redux? UseReducer?
- Hook up to a real db? Mongo?
- ~~Look at graphql~~
- Look at ReactQuery
- ~~Probably no need to be returning the full list when endpoint requests complete. Just success is fine since ei'm not using the responses. Although I might be able to use the response to prevent the flashing of the list as it updates after a change.~~
- Data migration: Add IMDB to all movies
- Maybe drop the time portion on the dates? It's not particularly useful what hour of the day the movie was watched. I just want to know the day.
- ~~Switch DB's so we can have more than one list~~
- ~~Rebuild the pick endpoint to build a list of conditions to satisfy for each movie.~~
- ~~Adding. Keep date added so I can sort it that way.~~
- ~~Refactor DB methods to take a table for CRUD actions~~
- ~~Make endpoints for "watched" things so i don't need to pass a tables constant to the endpoint~~.

#### BUGS

- ~~If no movies meet the criteria (none less than 90 minutes, empty list etc) the app blows up~~
- ~~Date displays day of year, not month, on watched list (i.e. Feb 32nd instead of Feb 1st)~~
- ~~Editing a movie shows the "added" toast.~~
- ~~Crash when deleting a movie~~
- ~~Common sense media requires the movie name to have dashes instead of spaces~~
- ~~TMDB is only replacing the first instace of a space~~
- ~~If a movie is marked watched and then undo reverts it, it still has a watched key in the db.~~
- Graph throws a warning when deleting a movie
