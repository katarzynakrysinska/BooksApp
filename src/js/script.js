/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
('use strict');

{
  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
      booksImage: '.books-list .book__image',
    },

  };
  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };

  // List of book rendering
  function render(){

    /* find menu container */
    const bookListContainer = document.querySelector(select.containerOf.booksList);
      
    for(const eachBook of dataSource.books){
    /* generate HTML based on template */
      const generatedHTML = templates.bookTemplate(eachBook);
      
      /* create element using utils.createElementFromHTML */
      const element = utils.createDOMFromHTML(generatedHTML);

      /* add element to menu */
      bookListContainer.appendChild(element);
    }
  }

  // Favorites
  // pusta tablica favoriteBooks

  const favoriteBooks = [];

  function initActions(){

    // reference to .book__image in .booksList
    const booksImage = document.querySelectorAll(select.containerOf.booksImage);

    // loop start
    for(const image of booksImage){

      // addEventListeners - dbl
      image.addEventListener('dblclick', function(event){

        // preventDefault
        event.preventDefault();
        const clickedElement = this;

        //add class favorite 
        clickedElement.classList.add('favorite');

        // extract id from element
        const bookId = clickedElement.getAttribute('data-id');

        // add id faviriteBooks
        favoriteBooks.push(bookId);
        console.log('favoriteBooks:', favoriteBooks);
      });
    }
  }










  render();
  initActions();
}

