const movies = [
{
title: "Interstellar",
year: 2014,
genre: "Sci-Fi",
rating: "8.7",
image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
description: "A team of explorers travels beyond this galaxy to discover whether mankind has a future among the stars."
},
{
title: "The Dark Knight",
year: 2008,
genre: "Action",
rating: "9.0",
image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
description: "Batman faces a criminal mastermind who wants to plunge Gotham City into chaos."
},
{
title: "Inception",
year: 2010,
genre: "Sci-Fi",
rating: "8.8",
image: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
description: "A skilled thief enters people's dreams to steal secrets and attempts an almost impossible mission."
},
{
title: "The Matrix",
year: 1999,
genre: "Sci-Fi",
rating: "8.7",
image: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
description: "A computer hacker discovers that reality is not what it seems."
},
{
title: "Gladiator",
year: 2000,
genre: "Action",
rating: "8.5",
image: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
description: "A betrayed Roman general fights his way through the arena in search of justice."
},
{
title: "The Shawshank Redemption",
year: 1994,
genre: "Drama",
rating: "9.3",
image: "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
description: "Two prisoners form an unlikely friendship and discover the enduring power of hope."
},
{
title: "Dune",
year: 2021,
genre: "Sci-Fi",
rating: "8.0",
image: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
description: "A young heir travels to a dangerous desert planet that holds the key to his destiny."
},
{
title: "John Wick",
year: 2014,
genre: "Action",
rating: "7.4",
image: "https://image.tmdb.org/t/p/w500/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg",
description: "A retired assassin returns to the underworld and confronts his violent past."
},
{
title: "Forrest Gump",
year: 1994,
genre: "Drama",
rating: "8.8",
image: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
description: "An extraordinary man unknowingly witnesses and influences remarkable moments in history."
},
{
title: "Spider-Man: No Way Home",
year: 2021,
genre: "Action",
rating: "8.2",
image: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
description: "Peter Parker faces unexpected visitors from across the multiverse."
}
];

const trendingRow = document.getElementById("trendingRow");
const movieGrid = document.getElementById("movieGrid");
const searchInput = document.getElementById("searchInput");
const emptyMessage = document.getElementById("emptyMessage");
const movieDialog = document.getElementById("movieDialog");
const toast = document.getElementById("toast");

let activeFilter = "All";
let currentSearch = "";
let toastTimer;

function createMovieCard(movie) {
const card = document.createElement("article");
card.className = "movie-card";
card.tabIndex = 0;
card.setAttribute("role", "button");
card.setAttribute("aria-label", `View details for ${movie.title}`);

```
const image = document.createElement("img");
image.className = "movie-poster";
image.src = movie.image;
image.alt = `${movie.title} poster`;
image.loading = "lazy";

image.onerror = () => {
    image.onerror = null;
    image.src = "https://placehold.co/400x600/202020/ffffff?text=Movie";
};

const title = document.createElement("h3");
title.className = "movie-title";
title.textContent = movie.title;

const info = document.createElement("p");
info.className = "movie-info";
info.textContent = `${movie.year}  •  ${movie.genre}  •  ★ ${movie.rating}`;

card.append(image, title, info);

card.addEventListener("click", () => showMovie(movie));
card.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        showMovie(movie);
    }
});

return card;
```

}

function renderTrending() {
trendingRow.replaceChildren();

```
movies.slice(0, 7).forEach(movie => {
    trendingRow.appendChild(createMovieCard(movie));
});
```

}

function renderMovies() {
const filteredMovies = movies.filter(movie => {
const matchesSearch = movie.title.toLowerCase().includes(currentSearch);
const matchesGenre = activeFilter === "All" || movie.genre === activeFilter;

```
    return matchesSearch && matchesGenre;
});

movieGrid.replaceChildren();

filteredMovies.forEach(movie => {
    movieGrid.appendChild(createMovieCard(movie));
});

emptyMessage.hidden = filteredMovies.length > 0;
```

}

function showMovie(movie) {
document.getElementById("dialogImage").src = movie.image;
document.getElementById("dialogImage").alt = movie.title;
document.getElementById("dialogTitle").textContent = movie.title;
document.getElementById("dialogDescription").textContent =
`${movie.year} • ${movie.genre} • ★ ${movie.rating}\n\n${movie.description}`;

```
movieDialog.showModal();
```

}

function showToast(message) {
toast.textContent = message;
toast.classList.add("show");

```
clearTimeout(toastTimer);
toastTimer = setTimeout(() => toast.classList.remove("show"), 2500);
```

}

searchInput.addEventListener("input", event => {
currentSearch = event.target.value.trim().toLowerCase();
renderMovies();
});

document.querySelectorAll(".filter").forEach(button => {
button.addEventListener("click", () => {
document.querySelector(".filter.active")?.classList.remove("active");
button.classList.add("active");

```
    activeFilter = button.dataset.filter;
    renderMovies();
});
```

});

document.getElementById("closeDialog").addEventListener("click", () => {
movieDialog.close();
});

movieDialog.addEventListener("click", event => {
if (event.target === movieDialog) {
movieDialog.close();
}
});

document.getElementById("playHero").addEventListener("click", () => {
showToast("Demo only — video playback is not available.");
});

document.getElementById("infoHero").addEventListener("click", () => {
showMovie({
title: "The Last Frontier",
year: 2026,
genre: "Action • Sci-Fi",
rating: "9.0",
image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=85",
description: "When the world falls into darkness, one unlikely hero must uncover the truth before humanity loses its final hope."
});
});

document.getElementById("dialogPlay").addEventListener("click", () => {
showToast("Demo only — video playback is not available.");
});

renderTrending();
renderMovies();
