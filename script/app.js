//HTML variables
const inputValue = document.querySelector("input");
const searchBtn = document.querySelector(".search");
const firstViewElement = document.querySelector(".firstView");
const secondViewElement = document.querySelector("section");
const refreshBtn = document.querySelector("i");

//all weather data
const weather = [];

const handleClickSearch = (e) => {
  e.preventDefault();

  inputValue.value ? getDataApi() : alert("First You must type a value !");
};

const getDataApi = async () => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&appid=962e96c7edd5b917153804d1e003d0ff&units=metric`;

  const response = await fetch(URL);
  const data = await response.json();
  const status = response.status;

  status != 404 ? createWeatherObj(data) : alert("Ohh, we have error :(");
};

const createWeatherObj = (data) => {
  //descrutcuring api object
  const { temp, humidity } = data.main;

  const { icon, description } = data.weather[0];

  const item = {
    temp: Math.round(temp),
    humidity,
    icon,
    description,
  };

  weather.push(item);

  showSection();
  createElement(item);
};

const createElement = (item) => {
  const { temp, humidity, description, icon } = item;

  const tempEl = document.createElement("p");
  const humidityEl = document.createElement("p");
  const descriptionEl = document.createElement("p");
  const imageEl = document.createElement("img");

  tempEl.innerHTML = `${temp}&#176;C`;
  humidityEl.innerHTML = `${humidity}%`;
  descriptionEl.innerHTML = description;

  const imageURL = `http://openweathermap.org/img/wn/${icon}.png`;

  imageEl.src = imageURL;

  secondViewElement.append(tempEl, humidityEl, imageEl, descriptionEl);
};

const showSection = () => {
  firstViewElement.classList.toggle("top");
  secondViewElement.classList.toggle("display");
  refreshBtn.classList.toggle("show");
};

const refreshPage = () => location.reload();

searchBtn.addEventListener("click", handleClickSearch);
refreshBtn.addEventListener("click", refreshPage);
