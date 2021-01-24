UI TODO:

- Pick should not filter the list. Pop it up in a modal or insert a section under the button. Use a short animation of random selections before showing the choice.
- Restrict pick to a certain genre.
- No source. Is there a way to search Netflix/Prime/Disney?
- Mobile view
- Idea: Highlight/filter long and short movies on rollover? Probably not needed.
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

DB TODO:

- Track how many times a movie has been "repicked"...might need a "Not tonight" button. Might be able to do something interesting with this data.
- Pull in a movie rating? Length? Genre? Synopsis? Can get these from the moviedb api but I'd need to get results based on title and then either let you choose or filter results for an exact match of the title? Could be messy but would be really nice.
- State needs to be reworked a bit. Passing a lot of functions into display components. Redux? UseReducer?
- DB. Hook up to a real db? Mongo?
- DB. Look at graphql/react query?
- Probably no need to be returning the full list when endpoint requests complete. Just success is fine since ei'm not using the responses. Although I might be able to use the response to prevent the flashing of the list as it updates after a change.
- Rebuild the pick endpoint to build a list of conditions to satisfy for each movie.
- ~~Adding. Keep date added so I can sort it that way.~~
- ~~Refactor DB methods to take a table for CRUD actions~~
- ~~Make endpoints for "watched" things so i don't need to pass a tables constant to the endpoint~~.
