//alert("show");
App.ShowBookView = Ember.View.extend({
  templateName: 'templates/books/show',
  classNames:   ['show-book'],
  tagName:      'tr',

  doubleClick: function() {
    this.showEdit();
  },

  showEdit: function() {
    this.set('isEditing', true);
  },

  hideEdit: function() {
    this.set('isEditing', false);
  },

  destroyRecord: function() {
    var book = this.get("book");

    book.destroyResource()
      .fail( function(e) {
        App.displayError(e);
      })
      .done(function() {
        App.booksController.removeObject(book);
        App.booksController.set("totalValues",App.booksController.get("totalValues")-1);
      });
  }
});

