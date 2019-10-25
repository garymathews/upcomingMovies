let movies = null;

/**
 * Asynchronous method to obtain movie listing.
 */
async function getMovies() {
	return new Promise((resolve, reject) => {

		// Attempt to use cached movie listing.
		if (movies) {
			return resolve(movies);
		}

		// Request movie listing from `themoviedb`.
		const client = Ti.Network.createHTTPClient({
			onload: e => {
				movies = JSON.parse(e.source.responseText).results;
				resolve(movies);
			},
			onerror: reject,
			timeout: 5000
		});
		client.open('GET', 'https://api.themoviedb.org/3/movie/upcoming?api_key=b31a733f2ca3cca5cf04cfdf1650a6d0&language=en-US&page=1');
		client.send();
	});
}

/**
 * Open info window for selected movie.
 * Use for `onClick` in our view.
 * 
 * @param {Object} e Click event response.
 */
function openInfo(e) {

	// Breadcrumb to show we selected a movie.
	Alloy.Globals.aca.leaveBreadcrumb('open_info', { index: e.itemIndex });

	// Open movie info window.
	Alloy.createController('info', { index: e.itemIndex, movies }).getView().open();
}

// Breadcrumb to show we're requesting movie listing.
Alloy.Globals.aca.leaveBreadcrumb('load_movies');

// Attempt to obtain movie listing.
getMovies().then(results => {
	const entries = [];
	for (const movie of results) {

		// Create entries for ListView template.
		entries.push({
			title: { text: movie.title },
			background: { image: 'https://image.tmdb.org/t/p/w500' + movie.backdrop_path }
		});
	}
	$.section.setItems(entries);
	$.list.setSections([ $.section ]);

	// Breadcrumb to show we've obtained movie listing.
	Alloy.Globals.aca.leaveBreadcrumb('loaded_movies', { movies: results.length });

	$.index.open();
}).catch(console.error);
