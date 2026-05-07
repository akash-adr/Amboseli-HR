document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      // Simulate search functionality
      const val = e.target.value;
      console.log('Searching for:', val);
    });
  }
});
