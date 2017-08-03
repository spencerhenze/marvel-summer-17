function MarvelService() {
  var apiKey = "apikey=cb668c0d13747ebfc7c477b05d7a3113";
  var baseUrl = "https://gateway.marvel.com:443/v1/public/characters";

  var marvelResults = []
  var myRoster = []

  this.search = function (query, cb) {
    // TODO: GET NAME SEARCH WORKING?????
    if (query) {
      query = "/" + query +"?"
    }
    else {
      query = '?';
    }
    console.log(baseUrl + query + apiKey);

    $.get(baseUrl + query + apiKey).then(function (res) {
      marvelResults = res.data.results
      cb(res.data.results)
    })
  }

  this.findId = function (userInput){
    var character = marvelResults.find(char => char.name == userInput);
    return character.id;
  }

  this.addCharacter = function (id) {

    var character = marvelResults.find(char => char.id == id)

    if (myRoster.indexOf(character) == -1) {
      myRoster.push(character)
    }

    // myRoster[id] = character


    // for (var i = 0; i < marvelResults.length; i++) {
    //   var character = marvelResults[i];
    //   if(character.id == id){
    //     return character
    //   }
    // }

  }

  this.removeCharacter = function(id) {
    for(var i = 0; i<myRoster.length; i++){
      var currentCharacter = myRoster[i];
      if(currentCharacter.id == id){
        myRoster.splice(i, 1)
      }
    }
  }

  this.getRoster = function () {
    return JSON.parse(JSON.stringify(myRoster))
  }

}