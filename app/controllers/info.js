const movie = $.args.movies[$.args.index];

// Breadcrumb to show we have navigated to the movie info screen.
Alloy.Globals.aca.leaveBreadcrumb('opened_info', { title: movie.title });

// Log handled exception.
if ($.args.index === 1) {
    try {
        throw new Error('this is a handled exception');
    } catch (e) {

        // Log the exception silently.
        Alloy.Globals.aca.logHandledException(e);
    }

// Unhandled exception.
} else if ($.args.index === 2) {

    // Oops?!
    Titanium.crash();
}

// Set our UI components.
$.poster.image = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
$.title.text = movie.title;
$.rating.text = `${movie.vote_average}/10`;
$.date.text = movie.release_date;
$.description.text = movie.overview;