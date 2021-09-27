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

    class: {
      favoriteBook: 'favorite',
      hidden: 'hidden',
    },
  };
  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };

  class BooksList {
    constructor() {
      const thisBookList = this;
      thisBookList.initData();
      thisBookList.getElements();
      thisBookList.render();
      thisBookList.initActions();
      thisBookList.determineRatingBgc();
    }
  
    initData() {
      const thisBookList = this;
      thisBookList.data = dataSource.books;
    }
  
    getElements() {
      const thisBookList = this;
      thisBookList.filters = [];
      thisBookList.favoriteBooks = [];
      thisBookList.bookListContainer = document.querySelector(select.containerOf.booksList);
      thisBookList.booksImages = document.querySelectorAll(select.containerOf.booksImage);
      thisBookList.booksForm = document.querySelector(select.forms.form);
    }

    render() {
      /* find menu container */
      const thisBookList = this;
      
      for(const eachBook of dataSource.books) {

        eachBook.ratingBgc = thisBookList.determineRatingBgc(eachBook.rating);
        eachBook.ratingWidth = eachBook.rating * 10;
        /* generate HTML based on template */
        const generatedHTML = templates.bookTemplate(eachBook);
      
        /* create element using utils.createElementFromHTML */
        const element = utils.createDOMFromHTML(generatedHTML);

        /* add element to menu */
        thisBookList.bookListContainer.appendChild(element);
      }
    }

    initActions() {
      const thisBookList = this;
   
      // eventListener
      thisBookList.bookListContainer.addEventListener('dblclick', function (event) {
        event.preventDefault();
        
        //event.target
        const clickedElement = event.target.offsetParent;
        const id = clickedElement.getAttribute('data-id');

        if (!clickedElement.classList.contains('favorite')) {
          thisBookList.favoriteBooks.push(id);
          clickedElement.classList.add('favorite');
        } else {
          thisBookList.favoriteBooks.splice(thisBookList.favoriteBooks.indexOf(id), 1);
          clickedElement.classList.remove('favorite');
        }
      });

      // filters part
      thisBookList.booksForm.addEventListener('click', function(event) {
        const clickedElement = event.target;
     
        if(clickedElement.tagName === 'INPUT' && clickedElement.type === 'checkbox' && clickedElement.name === 'filter') {
          console.log('clickedElement.value', clickedElement.value);
        
          if(clickedElement.checked) {
            thisBookList.filters.push(clickedElement.value);
        
          } else {
            thisBookList.filters.splice(thisBookList.filters.indexOf(clickedElement.value), 1);
          }
          console.log('filters', thisBookList.filters);
        }
        thisBookList.filterBooks();
      });
    }
  
    filterBooks() {
      const thisBookList = this;
    
      for(const eachBook of dataSource.books) {
        const bookToBeHidden = document.querySelector(`.book__image[data-id="${eachBook.id}"]`);
        let shouldBeHidden = false;
        
        for(const filter of thisBookList.filters) {
          if(!eachBook.details[filter]) {
            shouldBeHidden = true;
            break;
          } 
        }
        
        if(shouldBeHidden){
          bookToBeHidden.classList.add(select.class.hidden);
        } else {
          bookToBeHidden.classList.remove(select.class.hidden);
        }
      }
    }
  
    determineRatingBgc(rating) {
      const thisBookList = this;
      thisBookList.background = '';
      if(rating < 6) {
        thisBookList.background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      }
      if(rating > 6 && rating <= 8) {
        thisBookList.background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      }
      if(rating > 8 && rating <= 9) {
        thisBookList.background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      }
      if(rating > 9) {
        thisBookList.background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
      return thisBookList.background;
    }
  }

  const app = new BooksList();
  console.log(app);
}

