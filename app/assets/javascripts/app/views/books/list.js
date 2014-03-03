
App.ListBooksView = Ember.View.extend({
    templateName:    'templates/books/list',
    booksBinding: 'App.booksController',

 showNew: function() {
//alert("dddd");
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
        App.employeesController.findAll();
    }
         
});


