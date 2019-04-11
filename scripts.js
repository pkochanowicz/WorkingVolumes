var book_items_shown = 0;
var itemsList;

function findDOMElements(){
  var search_input = document.getElementById("search_input");
  var search_request = document.getElementById("search_request");
  }

  search_input.onchange = function search(){
  var adjusted_search_input = search_input.value.split(' ').join('+');
  if (adjusted_search_input != "") {
  load_searching_script(adjusted_search_input);
  document.getElementById("books_list").innerHTML = "";
  book_items_shown = 0;
}
}

window.onscroll = function() {
    var pageHeight = document.getElementById("content").clientHeight ;
    var windowHeight = window.innerHeight;
    var pageYOffset = window.pageYOffset;
    if (windowHeight + pageYOffset >= pageHeight){
      handleScrollDown(itemsList);
    }
};

function handleResponse(response) {
  itemsList = response.items;
  for (var i = 0; i < 2; i++) {
    if (typeof(itemsList[i]) == 'undefined') return;
    add_book_to_books_list(itemsList[i]);
    book_items_shown += 1;
}
}

function handleScrollDown(itemsList) {
  var book_items_shown_at_beggining = book_items_shown;
  for (var i = book_items_shown_at_beggining + 1; i < book_items_shown_at_beggining + 3; i++) {
    if (typeof(itemsList[i]) == 'undefined');
    add_book_to_books_list(itemsList[i]);
    book_items_shown += 1;
  }
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

function shorten_string(str, maxLen, separator = ' ') {
  if (str){
  if (str.length <= maxLen) return str;
  return str.substr(0, str.lastIndexOf(separator, maxLen));
}
 else return "Brak opisu";
}
