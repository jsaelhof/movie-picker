UI TODO:

- After using Pick Movie, you should be able to return to the full list.
- Editing. Using "Add" with new info doesn't work to fix a title. Runtime also gets overwritten if not provided.
- Adding. Should this be a modal? A "drawer" space that slides open under the toolbar?
- Sort by name/date added/length.
- Restrict pick to 100 minutes or less.
- Restrict pick to 125 minutes or less.
- Restrict pick to 125 minutes or more (long movie night).
- Restrict pick to a certain genre.
- No Source, search for a torrent
- No source. Is there a way to search Netflix/Prime/Disney?
- Genre should be a dropdown of a few groad genres.
- Mobile view

DB TODO:

- Adding. Keep date added so I can sort it that way.
- Track how many times a movie has been "repicked"...might need a "Not tonight" button. Might be able to do something interesting with this data.
- Pull in a movie rating? Length? Genre? Synopsis? Can get these from the moviedb api but I'd need to get results based on title and then either let you choose or filter results for an exact match of the title? Could be messy but would be really nice.
- State needs to be reworked a bit. Passing a lot of functions into display components. Redux? UseReducer?
- DB. Hook up to a real db? Mongo?
- DB. Look at graphql/react query?
