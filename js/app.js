// ==========================================
// PROJECT 2: LOCAL FAVORITES TRACKER
// LAB14: Delete, Search, and Filter
// ==========================================


console.log('LAB14: Delete, Search, and Filter');

// Array to store all favorites
let favorites = [];

// Get references to DOM elements
const form = document.getElementById('add-favorite-form');
const favoritesList = document.getElementById('favorites-list');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');

console.log('Form:', form);
console.log('Favorites list:', favoritesList);
console.log('Search input:', searchInput);
console.log('Category filter:', categoryFilter);

// Display all favorites (resets filters, then delegates to search)
function displayFavorites() {
  console.log('Displaying favorites...');
  favoritesList.innerHTML = '';

  if (favorites.length === 0) {
    favoritesList.innerHTML =
      '<p class="empty-message">No favorites yet. Add your first favorite place above!</p>';
    return;
  }



  searchInput.value = '';
  categoryFilter.value = 'all';
  searchFavorites();
}

// Search + filter + render
function searchFavorites() {
  const searchText = searchInput.value.toLowerCase().trim();
  const selectedCategory = categoryFilter.value;

  favoritesList.innerHTML = '';

  const filteredFavorites = favorites.filter(fav => {
    const matchesSearch =
      !searchText ||
      fav.name.toLowerCase().includes(searchText) ||
      fav.notes.toLowerCase().includes(searchText);

    
    const matchesCategory = selectedCategory === 'all' || fav.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (filteredFavorites.length === 0) {
    favoritesList.innerHTML =
      (searchText || selectedCategory !== 'all')
        ? '<p class="empty-message">No favorites match your search.</p>'
        : '<p class="empty-message">No favorites yet. Add your first favorite place above!</p>';
    return;
  }

  filteredFavorites.forEach(favorite => {
    const originalIndex = favorites.indexOf(favorite);
    const starsDisplay = '⭐'.repeat(favorite.rating);

    const cardHTML = `
      <div class="favorite-card">
        <h3>${favorite.name}</h3>
        <span class="favorite-category">${favorite.category}</span>
        <div class="favorite-rating">${starsDisplay} (${favorite.rating}/5)</div>
        <p class="favorite-notes">${favorite.notes}</p>
        <p class="favorite-date">Added: ${favorite.dateAdded}</p>
        <div class="favorite-actions">
          <button class="btn btn-danger" onclick="deleteFavorite(${originalIndex})">Delete</button>
        </div>
      </div>
    `;
    favoritesList.innerHTML += cardHTML;
  });
}

// Delete 
function deleteFavorite(index) {
  console.log('Deleting favorite at index:', index);
  const favorite = favorites[index];
  const confirmDelete = confirm(`Are you sure you want to delete "${favorite.name}"?`);

  if (confirmDelete) {
    favorites.splice(index, 1);
    searchFavorites(); // preserves current search/filter view
  }
}

// Handle add form submit
function addFavorite(event) {
  event.preventDefault();

  const nameInput = document.getElementById('name');
  const categoryInput = document.getElementById('category');
  const ratingInput = document.getElementById('rating');
  const notesInput = document.getElementById('notes');

  const nameValue = nameInput.value.trim();
  const categoryValue = categoryInput.value; // e.g. "coffee", "restaurants"
  const ratingValue = parseInt(ratingInput.value, 10);
  const notesValue = notesInput.value.trim();

  if (!nameValue || !categoryValue) {
    alert('Please fill in the place name and category!');
    return;
  }

  const newFavorite = {
    name: nameValue,
    category: categoryValue,
    rating: ratingValue,
    notes: notesValue,
    dateAdded: new Date().toLocaleDateString()
  };

  favorites.push(newFavorite);
  form.reset();
  displayFavorites();
}

// Event listeners
form.addEventListener('submit', addFavorite);
searchInput.addEventListener('input', searchFavorites);
categoryFilter.addEventListener('change', searchFavorites);

console.log('Event listeners attached - app is ready!');

// Initial render
displayFavorites();