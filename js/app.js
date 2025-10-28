// ==========================================
// PROJECT 2: LOCAL FAVORITES TRACKER
// LAB14: Delete, Searc, and Filtrer 
// ==========================================


console.log('LAB13: Functions & DOM Manipulation');

// Array to store all favorites
let favorites = [];

// Get references to DOM elements
const form = document.getElementById('add-favorite-form');
const favoritesList = document.getElementById('favorites-list');

console.log('Form:', form);
console.log('Favorites list container:', favoritesList);

// Function to display all favorites on the page
function displayFavorites() {
  console.log('Displaying favorites...');

  favoritesList.innerHTML = '';

  if (favorites.length === 0) {
    favoritesList.innerHTML = '<p class="empty-message">No favorites yet. Add your first favorite place above!</p>';
    return;
  }

  // Reset filters to "show all", then render via searchFavorites()
  document.getElementById('search-input').value = '';
  document.getElementById('category-filter').value = 'all';
  searchFavorites();
}

// Function to delete a favorite by index (GLOBAL, not nested)
function deleteFavorite(index) {
  console.log('Deleting favorite at index:', index);
  const favorite = favorites[index];
  const confirmDelete = confirm(`Are you sure you want to delete "${favorite.name}"?`);

  if (confirmDelete) {
    favorites.splice(index, 1);
    // Keep whatever search/filter is active
    searchFavorites();
  }
}

    // Function to delete a favorite by index
function deleteFavorite(index) {
    console.log('Deleting favorite at index:', index);
    console.log('Favorite to delete:', favorites[index].name);

    // Confirm deletion with user
    const favorite = favorites[index];
    const confirmDelete = confirm(`Are you sure you want to delete "${favorite.name}"?`);

    if (confirmDelete) {
        // Remove from array
        favorites.splice(index, 1);
        console.log('Favorite deleted. Total remaining:', favorites.length);

        // Re-apply current search/filter
        searchFavorites();
    } else {
        console.log('Deletion cancelled by user');
    }
}

// Loop through each favorite and create HTML
favorites.forEach(function(favorite, index) {
    // Create the star rating display
    let starsDisplay = '⭐'.repeat(favorite.rating);

    // Build the HTML for this favorite card
    const cardHTML = `
        <div class="favorite-card">
            <h3>${favorite.name}</h3>
            <span class="favorite-category">${favorite.category}</span>
            <div class="favorite-rating">${starsDisplay} (${favorite.rating}/5)</div>
            <p class="favorite-notes">${favorite.notes}</p>
            <p class="favorite-date">Added: ${favorite.dateAdded}</p>
            <div class="favorite-actions">
                <button class="btn btn-danger" onclick="deleteFavorite(${index})">Delete</button>
            </div>
        </div>
    `;

    // Add to the favorites list
    favoritesList.innerHTML += cardHTML;
});
    console.log('Displayed', favorites.length, 'favorite(s)');

    // Function to search and filter favorites
function searchFavorites() {
  const searchText = document.getElementById('search-input').value.toLowerCase().trim();
  const selectedCategory = document.getElementById('category-filter').value;

  favoritesList.innerHTML = '';

  const filtered = favorites.filter(fav => {
    const matchesSearch =
      !searchText ||
      fav.name.toLowerCase().includes(searchText) ||
      fav.notes.toLowerCase().includes(searchText);

    const matchesCategory = selectedCategory === 'all' || fav.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (filtered.length === 0) {
    favoritesList.innerHTML =
      (searchText || selectedCategory !== 'all')
        ? '<p class="empty-message">No favorites match your search.</p>'
        : '<p class="empty-message">No favorites yet. Add your first favorite place above!</p>';
    return;
  }

  filtered.forEach(favorite => {
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

// Function to handle adding a new favorite
function addFavorite(event) {
    event.preventDefault();  // Prevent page reload

    console.log('Add Favorite button clicked!');

    // Step 1: Get values from form inputs
    const nameInput = document.getElementById('name');
    const categoryInput = document.getElementById('category');
    const ratingInput = document.getElementById('rating');
    const notesInput = document.getElementById('notes');

    const nameValue = nameInput.value;
    const categoryValue = categoryInput.value;
    const ratingValue = parseInt(ratingInput.value);  // Convert to number
    const notesValue = notesInput.value;

    // Step 2: Validate required fields
    if (!nameValue || !categoryValue) {
        alert('Please fill in the place name and category!');
        return;
    }

    // Step 3: Create a favorite object
    const newFavorite = {
        name: nameValue,
        category: categoryValue,
        rating: ratingValue,
        notes: notesValue,
        dateAdded: new Date().toLocaleDateString()
    };

    console.log('Created favorite object:', newFavorite);

    // Step 4: Add to favorites array
    favorites.push(newFavorite);
    console.log('Total favorites:', favorites.length);

    // Step 5: Clear the form for next entry
    form.reset();
    console.log('Form reset - ready for next favorite!');

    // Step 6: Display the updated favorites list
    displayFavorites();
}

// Connect the addFavorite function to the form submit event
form.addEventListener('submit', addFavorite);

// Connect the addFavorite function to the form submit event
form.addEventListener('submit', addFavorite);


const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', searchFavorites);

const categoryFilter = document.getElementById('category-filter');
categoryFilter.addEventListener('change', searchFavorites);

console.log('Event listeners attached – app is ready!');

// Display empty message when page first loads
displayFavorites();