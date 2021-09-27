{
  'use strict';

  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
      booksImage: '.books-list .book__image',
      booksFilters: '.filters',
    },

    forms: {
      form: '.filters form',
    },
  };
  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };

  const filters = [];
  const favoriteBooks = [];
  
  function render(){
    /* find menu container */
    const bookListContainer = document.querySelector(select.containerOf.booksList);
      
    for(const eachBook of dataSource.books) {

      eachBook.ratingBgc = determineRatingBgc(eachBook.rating);
      eachBook.ratingWidth = eachBook.rating * 10;
      /* generate HTML based on template */
      const generatedHTML = templates.bookTemplate(eachBook);
      
      
      /* create element using utils.createElementFromHTML */
      const element = utils.createDOMFromHTML(generatedHTML);

      /* add element to menu */
      bookListContainer.appendChild(element);
    }
  }

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
    
          } else {
            favoriteBooks.splice(favoriteBooks.indexOf(image), 1);
            event.target.offsetParent.classList.remove('favorite');
          }
        }
      });
    }

    // filters part
    const booksForm = document.querySelector('.filters form');
    booksForm.addEventListener('click', function(event) {
      const clickedElement = event.target;
     
      if(clickedElement.tagName === 'INPUT' && clickedElement.type === 'checkbox' && clickedElement.name === 'filter') {
        console.log('clickedElement.value', clickedElement.value);
        
        if(clickedElement.checked) {
          filters.push(clickedElement.value);
        
        } else {
          filters.splice(filters.indexOf(clickedElement.value), 1);
        }
        console.log('filters', filters);
      }
      filterBooks();
    });
  }

  function filterBooks (){
    for(const eachBook of dataSource.books) {

      let shouldBeHidden = false;
      const bookToBeHidden = document.querySelector('.book__image[data-id="' + eachBook.id + '"]');
      
      for(const filter of filters) {
        if(!eachBook.details[filter]) {
          shouldBeHidden = true;
          break;
        } 
      }
      
      if(shouldBeHidden){
        bookToBeHidden.classList.add('hidden');
      } else {
        bookToBeHidden.classList.remove('hidden');
      }
    }
  }

  function determineRatingBgc(rating) {
    let background = '';
    if(rating < 6) {
      background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    }
    if(rating > 6 && rating <= 8) {
      background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    }
    if(rating > 8 && rating <= 9) {
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    }
    if(rating > 9) {
      background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }

    return background;
  }

  
  render();
  determineRatingBgc();
  initActions();
  
}

