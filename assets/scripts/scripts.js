// Variabili utili
const apiKey = 'f23d8bde1c219c5db7e4b8b37a7b6af0';
const api = 'https://api.openweathermap.org/data/2.5';
const apiFirstCard = `${api}/weather?q=Milano&appid=${apiKey}&units=metric`;
const apiSecondCard = `${api}/forecast?q=Milano&appid=${apiKey}&units=metric`;

// Chiamata per la prima card
const getWeather = function () {
  fetch(apiFirstCard)
    .then((res) => {
      console.log('RESPONSE', res);
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('LA RESPONSE 1 NON È ANDATA A BUON FINE');
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
      const card = document.getElementById('first-card');

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
      console.log('ERRORE NELLA CHIAMATA API 1', err);
    });
};

getWeather();

// Chiamata per la seconda card
const getForecast = function () {
  fetch(apiSecondCard)
    .then((res) => {
      console.log('RESPONSE', res);
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('LA RESPONSE 2 NON È ANDATA A BUON FINE');
      }
    })
    .then((forecastObj) => {
      console.log(forecastObj);
      const hourContainer = document.querySelectorAll('.hour');

      const hourNeeds = forecastObj.list.slice(0, 5);

      hourNeeds.forEach((data, index) => {
        const slot = hourContainer[index];

        const date = new Date(data.dt * 1000);
        let hour = date.getHours();
        const ampm = hour > 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;

        slot.querySelector('.hour-temp').innerText =
          Math.round(data.main.temp) + '°';
        slot.querySelector('.hour-icon').src =
          `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        slot.querySelector('.hour-time').innerText = hour + ':00';
        slot.querySelector('.am-pm').innerText = ampm;
      });

      // Funzione per cambiare il background se è notte
      const iconChange = hourNeeds[0].weather[0].icon;
      const card = document.getElementById('second-card');

      if (iconChange.endsWith('n')) {
        card.style.background =
          'linear-gradient(135deg, #2c3e50 0%, #000000 100%)';
        card.style.color = 'white';
      }
    })
    .catch((err) => {
      console.log('ERRORE NELLA CHIAMATA API 2', err);
    });
};

getForecast();
