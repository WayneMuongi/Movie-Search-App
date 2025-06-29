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


    
