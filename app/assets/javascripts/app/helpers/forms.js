Handlebars.registerHelper('submitButton', function(text) {
//alert("submitButton")
  return new Handlebars.SafeString('<button type="submit">' + text + '</button>');
});
