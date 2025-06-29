document.addEventListener('DOMContentLoaded', () => {

const API_KEY = '5dde9039';
const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}&`;

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const moviesGrid = document.getElementById('moviesGrid');
const favoritesGrid = document.getElementById('favoritesGrid');

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

//event listener for search button
searchButton.addEventListener('click', handleSearch);

//event handler for search

function handleSearch() {
    const query = searchInput.value.trim();
    if (query) {
        fetchMovies(query);
    } else {
        alert('Please enter a movie title');
    }
});
    
