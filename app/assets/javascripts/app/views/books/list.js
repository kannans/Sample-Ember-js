
App.ListBooksView = Ember.View.extend({
    templateName:    'templates/books/list',
    booksBinding: 'App.booksController',

 showNew: function() {
         $.ajax({
            url: "/book/new",
            dataType: 'json'
            } );

        this.set('isNewVisible', true);
    },


 hideNew: function() {
        this.set('isNewVisible', false);
    },

    refreshListing: function() {
        App.booksController.findAll();
    }
         
});


