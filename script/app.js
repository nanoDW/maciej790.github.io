//HTML variables
const inputValue = document.querySelector("input");
const searchBtn = document.querySelector(".search");
const firstViewElement = document.querySelector(".firstView");
const secondViewElement = document.querySelector("section");
const refreshBtn = document.querySelector("i");

const handleClickSearch = async (e) => {
  e.preventDefault();

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&appid=962e96c7edd5b917153804d1e003d0ff&units=metric`;
  const weatherData = await getDataFromApi(url);
  const item = await createWeatherItem(weatherData);
  handleShow();
  createWeatherElement(item);

  inputValue.value = "";
};

//fetch data
const getDataFromApi = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    alert("Sorry we cannot display data :(");
  } else {
    return await response.json();
  }
};

const createWeatherItem = (weatherData) => {
  const { temp, humidity } = weatherData.main;
  const { description, icon } = weatherData.weather[0];

  const item = {
    temp: Math.round(temp),
    humidity: humidity,
    description: description,
    icon: `http://openweathermap.org/img/wn/${icon}.png`,
  };

  return item;
};

const createWeatherElement = (item) => {
  const { temp, humidity, description, icon } = item;

  const tempEl = document.createElement("p");
  const humidityEl = document.createElement("p");
  const descriptionEl = document.createElement("p");
  const imageEl = document.createElement("img");

  tempEl.innerHTML = `${temp}&#176;C`;
  humidityEl.innerHTML = `${humidity}%`;
  imageEl.src = icon;
  descriptionEl.innerHTML = description;

  secondViewElement.append(tempEl, humidityEl, imageEl, descriptionEl);
};

const handleShow = () => {
  firstViewElement.classList.toggle("top");
  secondViewElement.classList.toggle("display");
  refreshBtn.classList.toggle("display");
};

const handleRefreshPage = () => {
  location.reload();
};

searchBtn.addEventListener("click", handleClickSearch);
refreshBtn.addEventListener("click", handleRefreshPage);
