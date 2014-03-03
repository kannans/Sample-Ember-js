class Book < ActiveRecord::Base
  attr_accessible :author, :book_ispn, :name, :price
end
