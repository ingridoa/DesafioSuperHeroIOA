$("form").submit(function (event) {
  event.preventDefault();

  
  let inputValue = $("#input-buscar").val();
  let regex = /^[1-9]\d*$/;
  
  if (regex.test(inputValue)) {
    // Si el valor es un número positivo, realizar la solicitud AJAX
    let requestConfig = {
      url: `https://superheroapi.com/api.php/3033707663582647/${inputValue}`,
      type: "GET",
      dataType: "json",
      success: function (response) {
        const post = response;
        // Aquí se usa template literal para mostrar la carta con los datos del superhéroe
        let postCard = `<div class="card mb-3 m-auto" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${post.image.url}" alt="${post.name}" class="w-100">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${post.name}</h5> 
                <p class="card-text">Parientes: ${post.connections.relatives}</p>
                <p class="card-text">Ocupación: ${post.work.occupation}</p>
                <p class="card-text">Publicado por: ${post.biography.publisher}</p>
                <p class="card-text">Aliansa: ${post.connections["group-affiliation"]}</p>
                <p class="card-text">Altura: ${Array.isArray(post.appearance.height) ? post.appearance.height.join(' / ') : post.appearance.height}</p>
                <p class="card-text">Peso: ${Array.isArray(post.appearance.weight) ? post.appearance.weight.join(' / ') : post.appearance.weight}</p>            
                <p class="card-text"><small class="text-body-secondary">Género: ${post.appearance.gender}</small></p>

              </div>
            </div>
          </div>
        </div>`;

        $("#superhero").html(postCard);

        //Grafico de torta para superhero
        let estadistica = {
          durabilidad: parseInt(post.powerstats.durability),
          inteligencia: parseInt(post.powerstats.intelligence),
          fuerza: parseInt(post.powerstats.strength), 
          rapidez: parseInt(post.powerstats.speed), 
          combate: parseInt(post.powerstats.combat),
          poder: parseInt(post.powerstats.power), 

        } 

        const stact = [
          { y: parseInt(post.powerstats.durability), label: "durabilidad" },
          { y: parseInt(post.powerstats.intelligence), label:"inteligencia"},
          { y: parseInt(post.powerstats.strength), label: "fuerza"},
          { y: parseInt(post.powerstats.speed), label: "rapidez"},
          { y: parseInt(post.powerstats.combat), label: "combate"},
          { y: parseInt(post.powerstats.power), label: "poder"}
          
        ]


        var chart = new CanvasJS.Chart("chartContainer", {
          theme: "light2", // "light1", "light2", "dark1", "dark2"
          exportEnabled: true,
          animationEnabled: true,
          title: {
            text: "Desktop Browser Market Share in 2016"
          },
          data: [{
            type: "pie",
            startAngle: 25,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: stact,
        
          }]
        });
        chart.render();
        
        }

      },
      error: function (error) {
        console.log("¡Ha ocurrido un error!", error);
        alert("¡PELIGRO! Ha ocurrido un error.");
      },
    };
    $.ajax(requestConfig);
  } else {
    alert("Por favor, ingresa un número positivo válido.");
  }
});
