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

  cancelForm: function() {
    this.get("parentView").hideEdit();
  },

  submit: function(event) {
    var self = this;
    var book = this.get("book");

    event.preventDefault();

    book.saveResource()
      .fail( function(e) {
        App.displayError(e);
      })
      .done( function() {
        var parentView = self.get("parentView");
        parentView.get("book").duplicateProperties(book);
        parentView.hideEdit();
      });
  }
});
