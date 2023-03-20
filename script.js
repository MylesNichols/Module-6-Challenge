const apiKey = "d9c32d057369ca5c57ce2b62034eec13";
const dailyDisplayContainer = document.getElementById("daily-display");
const dailyForecastEl = document.getElementById("daily-forecastinfo");
const pastSearches = [];
const cityNameInput = document.querySelector('#cityname');

function saveSearch(cityName) {
  const pastSearch = cityName;
  localStorage.setItem('savedSearch', pastSearch);
  pastSearches.push(pastSearch);
  localStorage.setItem('pastSearches', JSON.stringify(pastSearches));
  createUniqueButtonsFromArray(pastSearches);
}

const searchButton = document.getElementById("btn");
searchButton.addEventListener("click", function(event) {
  event.preventDefault();
  const cityName = cityNameInput.value.trim();
  if (cityName) {
    geoFind(cityName);
    saveSearch(cityName);
    cityNameInput.value = '';
  } else {
    alert('Please enter a City');
  }
});

function geoFind(cityName) {
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`;
  fetch(geoUrl) 
    .then(response => response.json())
    .then(data => { 
      const lat = data[0].lat;
      const lon = data[0].lon;
      getFiveDayWeatherData(lat, lon);
      getTodaysWeatherData(lat, lon);
    });
}

function getFiveDayWeatherData(lat, lon) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    fetch(forecastUrl)
    .then(response => response.json())
    .then(data => { 
      const weeklyData = data;
      displayFiveDayForecast(weeklyData);
    });
}

function getTodaysWeatherData(lat, lon) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  fetch(apiUrl)
  .then(response => response.json())
  .then(data => { 
    const dailyData = data;
    displayTodaysForecast(dailyData);
  });
}

function displayFiveDayForecast(weeklyData) {
  const day1Header = weeklyData.list[0].dt_txt;
  $('#day1-header').text(day1Header);

  const day1Temp = weeklyData.list[0].main.temp;
  $('#daily-temp1').text('Temp: ' + day1Temp + '° F');

  const day1Speed = weeklyData.list[0].wind.speed;
  $('#daily-wind1').text(' Wind: ' + day1Speed + ' MPH');
    
  const day1Humidity = weeklyData.list[0].main.humidity;
  $('#daily-humidity1').text('Humidity: ' + day1Humidity + '%');

  const day1Icon = weeklyData.list[0].weather[0].icon;
  const day1URL = 'http://openweathermap.org/img/w/' + day1Icon + '.png';
  $('#day1-icon').attr('src', day1URL);

  const day2Header = weeklyData.list[8].dt_txt;
  $('#day2-header').text(day2Header);

  const day2Temp = weeklyData.list[8].main.temp;
  $('#daily-temp2').text('Temp: ' + day2Temp + '° F');

  const day2Speed = weeklyData.list[8].wind.speed= weeklyData.list[8].wind.speed;
  $('#daily-wind2').text(' Wind: ' + day2Speed + ' MPH');
  
  const day2Humidity = weeklyData.list[8].main.humidity;
  $('#daily-humidity2').text('Humidity: ' + day2Humidity + '%');
  
  const day2Icon = weeklyData.list[8].weather[0].icon;
  const day2URL = 'http://openweathermap.org/img/w/' + day2Icon + '.png';
  $('#day2-icon').attr('src', day2URL);
  
  const day3Header = weeklyData.list[16].dt_txt;
  $('#day3-header').text(day3Header);
  
  const day3Temp = weeklyData.list[16].main.temp;
  $('#daily-temp3').text('Temp: ' + day3Temp + '° F');
  
  const day3Speed = weeklyData.list[16].wind.speed;
  $('#daily-wind3').text(' Wind: ' + day3Speed + ' MPH');
  
  const day3Humidity = weeklyData.list[16].main.humidity;
  $('#daily-humidity3').text('Humidity: ' + day3Humidity + '%');
  
  const day3Icon = weeklyData.list[16].weather[0].icon;
  const day3URL = 'http://openweathermap.org/img/w/' + day3Icon + '.png';
  $('#day3-icon').attr('src', day3URL);
  
  const day4Header = weeklyData.list[24].dt_txt;
  $('#day4-header').text(day4Header);
  
  const day4Temp = weeklyData.list[24].main.temp;
  $('#daily-temp4').text('Temp: ' + day4Temp + '° F');
  
  const day4Speed = weeklyData.list[24].wind.speed;
  $('#daily-wind4').text(' Wind: ' + day4Speed + ' MPH');
  
  const day4Humidity = weeklyData.list[24].main.humidity;
  $('#daily-humidity4').text('Humidity: ' + day4Humidity + '%');
  
  const day4Icon = weeklyData.list[24].weather[0].icon;
  const day4URL = 'http://openweathermap.org/img/w/' + day4Icon + '.png';
  $('#day4-icon').attr('src', day4URL);
  
  const day5Header = weeklyData.list[32].dt_txt;
  $('#day5-header').text(day5Header);
  
  const day5Temp = weeklyData.list[32].main.temp;
  $('#daily-temp5').text('Temp: ' + day5Temp + '° F');
  
  const day5Speed = weeklyData.list[32].wind.speed;
  $('#daily-wind5').text(' Wind: ' + day5Speed + ' MPH');
  
  const day5Humidity = weeklyData.list[32].main.humidity;
  $('#daily-humidity5').text('Humidity: ' + day5Humidity + '%');
  
  const day5Icon = weeklyData.list[32].weather[0].icon;
  const day5URL = 'http://openweathermap.org/img/w/' + day5Icon + '.png';
  $('#day5-icon').attr('src', day5URL);
  }
  
  function displayTodaysForecast(dailyData) {
  const city = dailyData.name;
  const date = new Date(dailyData.dt * 1000).toLocaleDateString();
  const weather = dailyData.weather[0].main;
  const icon = dailyData.weather[0].icon;
  const temp = dailyData.main.temp;
  const wind = dailyData.speed;
  const humidity = dailyData.main.humidity;
  
  const iconURL = 'http://openweathermap.org/img/w/' + icon + '.png';
  
  $('#city').text(city);
  $('#date').text(date);
  $('#weather').text(weather);
  $('#daily-temp').text('Temp: ' + temp + '° F');
  $('#daily-wind').text(' Wind: ' + wind + ' MPH');
  $('#daily-humidity').text('Humidity: ' + humidity + '%');
  $('#daily-icon').attr('src', iconURL);
  }


