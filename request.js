const key = '5a06edc9521d0fb00a365a9cec48b9d6';

//const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Jakarta&appid=5a06edc9521d0fb00a365a9cec48b9d6';

//fetch(baseUrl)
// .then((data) => {
// console.log('response', data.json());
//})
//.catch((error) => {
//console.log(error);
//});

const requestCity = async (city) => {
  const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
  const query = `?q=${city}&units=metric&appid=${key}`;

  const response = await fetch(baseUrl + query);

  const data = await response.json();
  if (data.cod == 404) {
    alert('data tidak ditemukan');
  } else {
    return data;
  }
};

const requestByLatLong = async (lat, long) => {
  console.log('data masuk');
  const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
  const query = `?lat=${lat}&lon=${long}&units=metric&appid=${key}`;

  const response = await fetch(baseUrl + query);

  const data = await response.json();
  if (data.cod == 404) {
    alert('data tidak ditemukan');
  } else {
    return data;
  }
};

//requestCity('Jakarta');
