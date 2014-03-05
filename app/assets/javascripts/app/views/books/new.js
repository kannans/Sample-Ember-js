App.NewBookView = Ember.View.extend({
  tagName:      'form',
  templateName: 'templates/books/new',
  emp: null,
  isSavebook: null,
  image:null,
  classNames: ['ember-view', 'my-other-class'],

  init: function() {
    this._super();
    this.set("book", App.Book.create());
   },

  didInsertElement: function() {
    this._super();
    this.$('input:first').focus();
  },

  cancelForm: function() {
    //alert("yes");
    $.ajax({
    url: "/employees/new",
    dataType: 'json'
    } );

   
    this.get("parentView").hideNew();
  },

 
  nextSubmit: function(){
//alert("sss")
    this.submit("next");
  },
  prevSubmit: function(){
    
    this.submit("prev");
  },

  book_submit: function() {
    //alert(event);
//alert("submit")
    var actionValue = "next"
    var self = this;
    var book = this.get("book");
   
   book.set("isSavebook",true);
    book.saveBook(book.get("isSavebook"),actionValue)
      .fail( function(e) {
        //alert("fail");
//alert("fail")
        App.displayError(e);
      })
      .done(function() {
//alert("done");
              
         
           App.booksController.set("totalValues",App.booksController.get("totalValues")+1);
           self.get("parentView").hideNew();
           App.booksController.pushObject(book);
              
      });


  }
});

App.PreviewUploadImage = Ember.View.extend({
    fileField: Ember.TextField.extend({
        type: 'file',
        attributeBindings: ['image'],
        change: function(evt) {
            var input = evt.target;
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                var that = this;
                reader.onload = function(e) {
                    //that.$().parent(':eq(0)').children('img:eq(0)').attr('src', e.target.result);
                    var view = that.getPath('parentView.previewImageView');
                    view.printme();
                    view.set('src', e.target.result);
/* since there is a two-way binding with the img src
                    and the model, an update to one should be reflected
                    in the other.  However, this doesn't seem to be the case
My guess is because I am not using the ember.js wrapper functions to update
                    the src attribute.
                    */
                    
                    var appbook = App.Book.create();

                    appbook.set('image', e.target.result);

                    console.log("Model src [" + appbook.get('image') + "]");
                }
                reader.readAsDataURL(input.files[0]);
            }
        },
        printme: function() {
            console.log("In FilField view\n");
        },
    }),

    previewImageView: Ember.View.extend({
        attributeBindings: ['name', 'width', 'height', 'src'],
        tagName: 'img',
        viewName: 'previewImageView',
        printme: function() {
            console.log('in previewImageView');
        },
    }),
});




