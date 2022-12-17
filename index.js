if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
} else {
  console.log('Geolocation is not supported by this browser.');
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  console.log(lat, long);
  generateMap(lat, long);

  requestByLatLong(lat, long)
    .then((data) => {
      updateWeatherApp(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

const searchFrom = document.querySelector('.search-location');
const cityValue = document.querySelector('.search-location input');
const cityName = document.querySelector('.city-name p');
const cardBody = document.querySelector('.card-body');
let map = null;
let marker = null;

// const spitOutCelcius = (kelvin) => {
//   celcius = Math.round(kelvin - 273.15);
//   return celcius;
// };

updateWeatherApp = (city) => {
  console.log(city);
  const imageName = city.weather[0].icon;
  const iconSrc = `http://openweathermap.org/img/wn/${imageName}@2x.png`;
  cityName.textContent = city.name;
  cardBody.innerHTML = `
  <div class="card-midd row">
            <div class="col-8 text-center temp">
              <span>${city.main.temp}&deg;C</span>
            </div>
            <div class="col-4 condition-temp">
              <p>${city.weather[0].description}</p>
              <p>${city.main.temp_max}&deg;C</p>
              <p>${city.main.temp_min}&deg;C</p>
            </div>
          </div>

          <div class="icon-container card shadow mx-auto">
            <img src="${iconSrc}" alt="" />
          </div>

          <div class="card-bottom px-5 py-4 row">
            <div class="col text-center">
              <p>${city.main.feels_like}&deg;C</p>
              <br />
              <span>feels like</span>
            </div>
            <div class="col text-center">
              <p>${city.main.humidity}%</p>
              <br />
              <span>Humidity</span>
            </div>
          </div>
  `;
};

searchFrom.addEventListener('submit', (e) => {
  e.preventDefault();
  const citySearched = cityValue.value.trim();
  console.log(citySearched);
  searchFrom.reset();

  requestCity(citySearched)
    .then((data) => {
      updateWeatherApp(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

function generateMap(lat, long) {
  // Initialize the map and assign it to a variable for later use
  // there's a few ways to declare a VARIABLE in javascript.
  // you might also see people declaring variables using `const` and `let`
  if (!map) {
    map = L.map('map', {
      // Set latitude and longitude of the map center (required)
      center: [lat, long],
      // Set the initial zoom level, values 0-18, where 0 is most zoomed-out (required)
      zoom: 11,
    });

    // Create a Tile Layer and add it to the map
    var tiles = new L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      minZoom: '8',
    }).addTo(map);
  } else {
    map.setView([lat, long], 11);
  }

  marker = L.marker([lat, long], {
    draggable: true,
    title: '',
    opacity: 0.75,
  });

  marker.addTo(map);
  marker.on('dragend', function (e) {
    //console.log(e);
    let lat = e.target._latlng.lat;
    let long = e.target._latlng.lng;
    requestByLatLong(lat, long)
      .then((data) => {
        updateWeatherApp(data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
}
