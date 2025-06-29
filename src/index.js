document.addEventListener('DOMContentLoaded', () => {
    // Initialize the app
    updateFavorites();
    searchInput.focus();
});
const API_KEY = '5dde9039';
const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}&`;

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const moviesGrid = document.getElementById('moviesGrid');
const favoritesGrid = document.getElementById('favoritesGrid');

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// --- Event Listeners ---
searchButton.addEventListener('click', handleSearch);

// --- Event Handlers ---
function handleSearch() {
    const query = searchInput.value.trim();
    if (!query) {
        alert('Please enter a movie title');
        return;
    }
    searchMovies(query);
}

async function handleFavoriteClick(e) {
    const imdbID = e.target.dataset.imdbid;
    if (isFavorite(imdbID)) {
        removeFavorite(imdbID);
    } else {
        await addFavorite(imdbID);
    }
    updateFavorites();
}
//movie searching
async function searchMovies(query) {
    moviesGrid.innerHTML = '<p>Loading movies...</p>';
    try {
        const response = await fetch(`${API_URL}s=${query}`);
        const data = await response.json();
        if (data.Response === 'True') {
            const detailedMovies = await fetchMovieDetails(data.Search);
            renderMovies(detailedMovies, moviesGrid, false);
        } else {
            moviesGrid.innerHTML = '<p>No movies found.</p>';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        moviesGrid.innerHTML = '<p>Error fetching movies. Please try again later.</p>';
    }
}
async function fetchMovieDetails(movies) {
    // Fetch detailed info for each movie
    return Promise.all(
        movies.map(movie =>
            fetch(`${API_URL}i=${movie.imdbID}`)
                .then(res => res.json())
        )
    );
}

    
