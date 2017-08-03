function MarvelController() {
  var service = new MarvelService();

  function drawMarvel(arr) {
    var template = ''

    var imgLink = '';

    for (var i = 0; i < arr.length; i++) {
      var character = arr[i];
      character.imgLink = `${character.thumbnail.path}.${character.thumbnail.extension}`;

      template += `
      <div class="col-xs-12 col-sm-6 col-md-4">
        <div class="card hero-card-wrapper">
            <img class="card-img-top img-responsive hero-image" src="${character.imgLink}" alt="">
            <div class="card-block">
              <h4 class="card-title">${character.name}</h4>
              <a href="#" class="btn btn-primary add-button" onclick="app.controllers.marvelController.addCharacter(${character.id})">Add To Team</a>
            </div>
        </div>
      </div>
      
      `
    }
    document.getElementById('search-results').innerHTML = template
  }

  drawRoster = function () {
    //TODO: DRAW ROSTER
    var roster = service.getRoster()
    var template = ''

    roster.forEach(char => {
      template += `
      <div class="col-xs-12">
        <div class="card hero-roster-card-wrapper">
            <img class="card-img-top img-responsive" src="${char.imgLink}" alt="">
            <div class="card-block">
              <h4 class="card-title">${char.name}</h4>
              <p class="card-text">${char.description}</p>
              <a href="#" class="btn btn-primary" onclick="app.controllers.marvelController.removeCharacter(${char.id})">Remove</a>
            </div>
        </div>
      </div>

      `
    })

    document.getElementById('my-roster').innerHTML = template

  }

  this.addCharacter = function (id) {

    service.addCharacter(id)
    drawRoster()

  }

  this.removeCharacter = function (id) {    
    service.removeCharacter(id);
    drawRoster();
  }

  this.search = function search(e) {
    e.preventDefault();
    var character = e.target.character.value;
    var charId = service.findId(character);
    service.search(charId, drawMarvel)
  }

  service.search('', drawMarvel);
}
