function fetchBookCover(isbn, element) {
    const baseUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
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
        element.querySelector('figure').appendChild(imgElement); 
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  
  
  
  
  document.addEventListener('DOMContentLoaded', () => {
    const bookCoverElements = document.querySelectorAll('.bookCover');
    bookCoverElements.forEach(element => {
      const isbn = element.getAttribute('data-isbn');
      fetchBookCover(isbn, element);
    });
  });
  