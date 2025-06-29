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
//  favourites
function isFavorite(imdbID) {
    return favorites.some(movie => movie.imdbID === imdbID);
}

function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function removeFavorite(imdbID) {
    favorites = favorites.filter(movie => movie.imdbID !== imdbID);
    saveFavorites();
}

async function addFavorite(imdbID) {
    const response = await fetch(`${API_URL}i=${imdbID}`);
    const movie = await response.json();
    favorites.push(movie);
    saveFavorites();
}
function updateFavorites() {
    renderMovies(favorites, favoritesGrid, true);
    // Also update the main grid to reflect favorite status
    if (moviesGrid.children.length) {
        // Optionally,update favorite buttons in moviesGrid
        // For simplicity, you can re-run the last search if you store the query
    }
}

function renderMovies(movies, container, isFavoriteSection) {
    container.innerHTML = '';
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>Year: ${movie.Year}</p>
            <p>Rating: ${movie.imdbRating || 'N/A'}</p>
            <p>${movie.Plot || 'No description available.'}</p>
            <button class="favorite-btn${isFavorite(movie.imdbID) ? ' remove' : ''}" data-imdbid="${movie.imdbID}">
                ${isFavorite(movie.imdbID) ? '★' : '☆'}
            </button>
        `;
        container.appendChild(movieCard);
    });

    container.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', handleFavoriteClick);
    });
}


updateFavorites();
// Initial fetch to populate favorites section



    
