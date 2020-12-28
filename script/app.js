//variables
const button = document.querySelector("button");
const input = document.querySelector("input");
const homeView = document.querySelector(".firstView");
const resultView = document.querySelector(".secondView");
const refreshButton = document.querySelector(".refresh");

//total results
const weather = [];
let results;

const searchResult = (e) => {
  e.preventDefault();

  input.value
    ? fetchResult(input.value)
    : alert("First You mast type a value!");

  input.value = "";
};

const fetchResult = async (valueFromInput) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${valueFromInput}&appid=962e96c7edd5b917153804d1e003d0ff&units=metric`;

  //fetch my data from api
  const response = await fetch(URL);
  const status = response.status;
  const data = await response.json();

  results = data;

  saveData(results);
};

const saveData = (results) => {
  const item = {
    temp: results.main.temp,
    humidity: results.main.humidity,
    description: results.weather[0].main,
    img: results.weather[0].icon,
  };

  weather.push(item);

  changePositionForm();
};

const changePositionForm = () => {
  homeView.classList.toggle("top");
  refreshButton.style.display = "block";

  displayData();
};

const displayData = () => {
  resultView.style.opacity = 1;

  const imgCode = weather[0].img;

  const h1Temp = document.createElement("h1");
  const pHumidity = document.createElement("p");
  const img = document.createElement("img");
  const pDescription = document.createElement("p");

  img.src = `http://openweathermap.org/img/wn/${imgCode}.png`;
  img.style.width = "200px";
  img.style.height = "200px";

  const degree = "&#8451;";
  const procent = "%";

  h1Temp.innerHTML = weather[0].temp + degree;
  pHumidity.innerHTML = weather[0].humidity + procent;
  pDescription.innerHTML = weather[0].description;

  resultView.append(h1Temp, pHumidity, img, pDescription);
};

refreshButton.addEventListener("click", () => {
  location.reload();
});

button.addEventListener("click", searchResult);
