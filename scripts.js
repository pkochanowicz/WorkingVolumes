function findDOMElements(){
  var search_input = document.getElementById("search_input");
  var search_request = document.getElementById("search_request");
  }

  search_input.onchange = function search(){
  var adjusted_search_input = search_input.value.split(' ').join('+');
  if (adjusted_search_input != "") load_searching_script(adjusted_search_input);
}

function handleResponse(response) {
  document.getElementById("books_list").innerHTML = "";
  for (var i = 0; i < response.items.length; i++) {
    var item = response.items[i];
    // in production code, item.text should have the HTML entities escaped.
    add_book_to_books_list(item);
}
}

function shorten_string(str, maxLen, separator = ' ') {
  if (str){
  if (str.length <= maxLen) return str;
  return str.substr(0, str.lastIndexOf(separator, maxLen));
}
 else return "Brak opisu";
}

function add_book_to_books_list(item){
  if (typeof(item.volumeInfo.imageLinks) == 'undefined') var imageAdress = "Pictures/Brak.png";
  else var imageAdress = item.volumeInfo.imageLinks.thumbnail;
  document.getElementById("books_list").innerHTML += "<div class = 'book_piece'" +
                                                       "<br> <div class ='book_title_label'><b> " + item.volumeInfo.title + "</b> </div>" +
                                                       "<br> <div class='book_thumbnail'><img src=" + imageAdress + " alt=" + item.volumeInfo.title + "> </div>" +
                                                       "<br> <div class ='book_description'>" + shorten_string(item.volumeInfo.description, 100) + "</div>" +
                                                     "</div> <br>";

}

function load_searching_script(adjusted_search_input)
{
  var searching_scripts_div= document.getElementById("searching_scripts");
  var current_request_adress = document.getElementById("current_request_adress");
  if (current_request_adress != null)
  {
    searching_scripts_div.removeChild(searching_scripts_div.childNodes[0]);
  }
  var script= document.createElement("script");
  script.src= "https://www.googleapis.com/books/v1/volumes?q=" + adjusted_search_input +"&callback=handleResponse";
  script.id = "current_request_adress";
  searching_scripts_div.appendChild(script);
}
