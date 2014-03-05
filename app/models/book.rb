class Book < ActiveRecord::Base
  attr_accessible :author, :book_ispn, :name, :price,:image
 validates :name,:author,:book_ispn,:price,:image, :presence => true 
 def image_url
	"/app/assets/"+image
 end

def self.splitBase64(uri)
  if uri.match(%r{^data:(.*?);(.*?),(.*)$})
    return {
      type:      $1, # "image/png"
      encoder:   $2, # "base64"
      data:      $3, # data string
      extension: $1.split('/')[1] # "png"
      }
  end
end

end
