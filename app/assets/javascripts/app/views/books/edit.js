App.EditBookView = Ember.View.extend({
  tagName:      'form',
  templateName: 'templates/books/edit',

  init: function() {
    this._super();

    // Create a new contact that's a duplicate of the contact in the parentView;
    // Changes made to the duplicate won't be applied to the original unless
    // everything goes well in submitForm()
    this.set("book", this.get('parentView').get('book').copy());
  },

  didInsertElement: function() {
    this._super();
    console.log(this);
    this.$('input:first').focus();
  },

 refreshListing: function() {
        App.employeesController.findAll();
    },

  cancelForm: function() {
    this.get("parentView").hideEdit();
  },

  submit: function(event) {
    var self = this;
    var book = this.get("book");
    var book_image = $('#book_image').attr('src');
    //alert(book_image);
    book.set('image',book_image);
    event.preventDefault();

    book.saveResource()
      .fail( function(e) {
        App.displayError(e);
      })
      .done( function() {
        var parentView = self.get("parentView");
        parentView.get("book").duplicateProperties(book);
        parentView.hideEdit();
        book.refreshListing();
      });
  }
});
