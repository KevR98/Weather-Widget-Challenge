// Variabili utili
const apiKey = 'f23d8bde1c219c5db7e4b8b37a7b6af0';
const api = 'https://api.openweathermap.org/data/2.5/weather';

const getWeather = function () {
  fetch(`${api}?q=Milano&appid=${apiKey}&units=metric&lang=it`)
    .then((res) => {
      console.log('RESPONSE', res);
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('LA RESPONSE NON È ANDATA A BUON FINE');
      }
    })
    .then((weatherObj) => {
      console.log(weatherObj);
      const temp = document.getElementById('temp');
      const city = document.getElementById('city');
      const icon = document.getElementById('icon');

      temp.innerText = Math.round(weatherObj.main.temp) + '°';
      city.innerText = weatherObj.name + ', ' + weatherObj.sys.country;

      const iconChange = weatherObj.weather[0].icon;
      const weatherMain = weatherObj.weather[0].main;
      icon.src = `https://openweathermap.org/img/wn/${iconChange}@4x.png`;

      // Funzione per cambiare radiente in base al tempo del giorno
      const card = document.getElementById('card');

      let gradient = '';

      switch (weatherMain) {
        case 'Sunny':
          gradient = 'linear-gradient(135deg, #ffffff 0%, #fff9ea 100%)';
          break;

        case 'Cloudy':
          gradient = 'linear-gradient(135deg, #ffffff 0%, #d7e1ec 100%)';
          break;

        case 'Thunderstorm':
          gradient = 'linear-gradient(135deg, #ffffff 0%, #4e78a0 100%)';
          break;

        default:
          gradient = 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)';
      }

      // Funzione per cambiare il background se è notte
      if (iconChange.endsWith('n')) {
        gradient = 'linear-gradient(135deg, #2c3e50 0%, #000000 100%)';
        card.style.color = 'white';
      }

      card.style.background = gradient;
    })
    .catch((err) => {
      console.log('ERRORE NELLA CHIAMATA API', err);
    });
};

getWeather();
