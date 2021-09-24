/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
('use strict');

{
  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
    }
  };
  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };


  function render(){

    for(let eachBook of dataSource.books){
    /* generate HTML based on template */
      const generatedHTML = templates.bookTemplate(eachBook);
      
      /* create element using utils.createElementFromHTML */
      const element = utils.createDOMFromHTML(generatedHTML);

      /* find menu container */
      const bookListContainer = document.querySelector(select.containerOf.booksList);

      /* add element to menu */
      bookListContainer.appendChild(element);
    }
  }

  render();
}

