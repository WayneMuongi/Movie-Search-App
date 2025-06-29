document.addEventListener('DOMContentLoaded', () => {

   const API_KEY = '5dde9039';
const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}&`;

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const moviesGrid = document.getElementById('moviesGrid');
const favoritesGrid = document.getElementById('favoritesGrid');

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

});
    
