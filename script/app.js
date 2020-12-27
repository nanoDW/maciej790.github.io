//variables
const button = document.querySelector("button");
const input = document.querySelector("input");
const homeView = document.querySelector(".firstView");
const resultView = document.querySelector(".secondView");
const refreshButton = document.querySelector(".refresh");

//total results
const weather = [];

button.addEventListener("click", (e) => {
  e.preventDefault();

  input.value ? loadResult(input.value) : alert("First You mast type a value!");

  input.value = "";
});

const loadResult = async (valueFromInput) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${valueFromInput}&appid=962e96c7edd5b917153804d1e003d0ff&units=metric`;

  //fetch my data from api
  const response = await fetch(URL);
  const status = await response.status;
  const data = await response.json();

  if (status == 200) {
    const item = {
      temp: data.main.temp,
      humidity: data.main.humidity,
      description: data.weather[0].main,
      img: data.weather[0].icon,
    };

    homeView.classList.toggle("top");
    refreshButton.style.display = "block";

    weather.push(item);
    displayData(weather);
  } else {
    alert("Sorry we have a problem :(");
  }
};

const displayData = (weather) => {
  resultView.style.opacity = 1;

  const imgCode = weather[0].img;

  const h1_temp = document.createElement("h1");
  const p_humidity = document.createElement("p");
  const img = document.createElement("img");
  const p_description = document.createElement("p");

  img.src = `http://openweathermap.org/img/wn/${imgCode}.png`;
  img.style.width = "200px";
  img.style.height = "200px";

  const degree = "&#8451;";
  const procent = "%";

  h1_temp.innerHTML = weather[0].temp + degree;
  p_humidity.innerHTML = weather[0].humidity + procent;
  p_description.innerHTML = weather[0].description;

  resultView.appendChild(h1_temp);
  resultView.appendChild(p_humidity);
  resultView.appendChild(img);
  resultView.appendChild(p_description);
};

refreshButton.addEventListener("click", () => {
  location.reload();
});
