(function() {
  function getAllBooks() {
    return Array.from(document.querySelectorAll('div.abook'));
  }

  function sortBooksByAttribute(attribute) {
    return function(bookA, bookB) {
      const valueA = bookA.getAttribute(`data-${attribute}`);
      const valueB = bookB.getAttribute(`data-${attribute}`);

      if (attribute === 'rating' || attribute === 'date') {
        return parseInt(valueB) - parseInt(valueA);
      } else if (attribute === 'title') {
        return valueA.localeCompare(valueB);
      }
    };
  }

  function showSortedBooks(books) {
    const bookSection = document.createElement('section');
    bookSection.id = 'allbooks';
    books.forEach(book => bookSection.appendChild(book));
    
    const mainElement = document.querySelector('main');
    mainElement.replaceChild(bookSection, document.getElementById('allbooks'));
  }

  function sortBooks(event) {
    event.preventDefault();
    const target = event.target || window.event.srcElement;
    const id = target.id;

    const match = id.match(/^sort-(rating|title|date)$/);
    if (match) {
      const books = getAllBooks();
      books.sort(sortBooksByAttribute(match[1]));
      showSortedBooks(books);
    }
  }

  const searchSort = location.search;
  const matchSearch = searchSort.match(/\?sort=(rating|title|date)$/);
  if (matchSearch) {
    const books = getAllBooks();
    books.sort(sortBooksByAttribute(matchSearch[1]));
    showSortedBooks(books);
  }

  const sorters = document.getElementById('sorters');
  sorters.addEventListener('click', sortBooks);
})();





// Function to fetch book cover images using ISBN numbers
function fetchBookCover(isbn, element) {
  const baseUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
  fetch(baseUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch cover for ISBN ${isbn}`);
      }
      return response.blob();
    })
    .then(blob => {
      const imgUrl = URL.createObjectURL(blob);
      const imgElement = document.createElement('img');
      imgElement.src = imgUrl;
      element.querySelector('figure').appendChild(imgElement); // Adding the fetched cover image inside the figure element of the book
    })
    .catch(error => {
      console.error(error);
    });
}

// Fetch covers for each book
document.addEventListener('DOMContentLoaded', () => {
  const bookElements = document.querySelectorAll('.abook');
  bookElements.forEach(bookElement => {
    const isbn = bookElement.getAttribute('data-isbn');
    fetchBookCover(isbn, bookElement);
  });
});



document.addEventListener('DOMContentLoaded', () => {
  const bookCoverElements = document.querySelectorAll('.bookCover');
  bookCoverElements.forEach(element => {
    const isbn = element.getAttribute('data-isbn');
    fetchBookCover(isbn, element);
  });
});
