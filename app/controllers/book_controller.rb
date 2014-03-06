class BookController < ApplicationController

  def index
   @books = Book.paginate(:page => params[:page], :per_page => 50)

   respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @books }
    end

  end

def new

respond_to do |format|
         format.json { render json: {"new" => "ok"} }
      end

end
def create

if params[:key1][:book].present?
data_url = params[:key1][:book][:image]
if data_url.present?
data_url_split = data_url.split(',')[0].length if data_url
extension = Book.splitBase64(data_url)[:extension] if data_url
img = Base64.decode64(data_url[data_url_split .. -1]) if data_url
#File.open('app/assets/' + params[:key1][:book][:name], 'wb') { |f| f.write(jpeg) }
image_name = [*('A'..'Z')].sample(8).join
File.open('public/images/'+ image_name + '.' + extension, 'wb') { |f| f.write(img) }

@book = Book.new(:name=> params[:key1][:book][:name],:author=>params[:key1][:book][:author],:book_ispn=>params[:key1][:book][:book_ispn],:price=>params[:key1][:book][:price],:image=>"#{image_name}." + "#{extension}" )
else
session[:book_params] ||= {}
      
      session[:book_params].deep_merge!(params[:key1][:book]) if params[:key1][:book]
@book = Book.new(session[:employee_params])
    
end
else
session[:book_params] ||= {}
      
session[:book_params].deep_merge!(params[:key1][:book]) if params[:key1][:book]
@book = Book.new(session[:employee_params])
    
end
respond_to do |format|

if @book.valid?     
        @book.save 
         
         format.json { render json: @book, status: :created, location: @book }
          else
         format.json { render json: @book.errors, status: :unprocessable_entity }
        end 

    end
end
def edit

end

def update


data_url = params[:book][:image]
data_url_split = data_url.split(',')[0].length
extension = Book.splitBase64(data_url)[:extension]
img = Base64.decode64(data_url[data_url_split .. -1]) if data_url
image_name = [*('A'..'Z')].sample(8).join
#File.open('app/assets/' + params[:key1][:book][:name], 'wb') { |f| f.write(jpeg) }
File.open('public/images/'+ image_name + '.' + extension, 'wb') { |f| f.write(img) }

   @book = Book.find(params[:id])

    respond_to do |format|
      if @book.update_attributes(:name=> params[:book][:name],:author=>params[:book][:author],:book_ispn=>params[:book][:book_ispn],:price=>params[:book][:price],:image=>"#{image_name}." + "#{extension}")
        format.json { render json: @book, status: :created, location: @book }
      else      
        format.json { render json: @book.errors, status: :unprocessable_entity }
      end
    end
end


def destroy
    @book = Book.find(params[:id])
    @book.destroy

    respond_to do |format|      
      format.json { render json: nil, status: :ok }
    end
  end

end
