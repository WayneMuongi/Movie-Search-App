# Movie-Search-App

A simple web application to search for movies using the OMDb API and manage your favorite movies.

## Features

- Search for movies by title
- View detailed information (poster, year, rating, plot)
- Add or remove movies from your favorites
- Favorites are saved in your browser's local storage

## Getting Started

### Prerequisites

- A modern web browser

### Running the App

1. Clone or download this repository.
2. Open `index.html` in your browser.

Or, if you use [Live Server] in VS Code, right-click `index.html` and select **Open with Live Server**.

## Project Structure

```
.
├── index.html
├── css
│   └── styles.css
├── js
│   ├── app.js
│   └── api.js
└── README.md
```

- `index.html`: The main HTML file.
- `css/styles.css`: The stylesheet for the app.
- `js/app.js`: The main JavaScript file containing the app's logic.
- `js/api.js`: A JavaScript file for handling API requests.
- `README.md`: This README file.

## OMDb API

This app uses the [OMDb API](http://www.omdbapi.com/) to fetch movie data. You can get a free API key by signing up on their website. Once you have the API key, replace `YOUR_API_KEY` in `js/api.js` with your actual API key.

## Author
@WayneMuongi

## License

This project is under the instruction of Moringa School and is for learning purposes. All credits go towards the faculty of software engineering at Moringa School.
