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

    const booksImages = document.querySelectorAll('.book__image');
   
    for (let image of booksImages) {
      
      // eventListener
      image.addEventListener('dblclick', function (event) {

        event.preventDefault();

        //event.target
        const favoriteBookAtribute = event.target.offsetParent.getAttribute('data-id');

        if (event.target.offsetParent.classList.contains('book__image')) {

          if(!image.classList.contains('favorite')) {

            favoriteBooks.push(favoriteBookAtribute);
            
            event.target.offsetParent.classList.add('favorite');

            console.log('favoriteBooks', favoriteBooks);
            
          } else {

            favoriteBooks.splice(favoriteBooks.indexOf(image), 1);
           
            event.target.offsetParent.classList.remove('favorite');
           
            console.log('favoriteBooks', favoriteBooks);
          }
        }
      });
    }
  }


  render();
  initActions();
}

