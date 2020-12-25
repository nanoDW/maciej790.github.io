//variables
const button = document.querySelector("button");
const input = document.querySelector("input");
const homeView = document.querySelector(".firstView");
const refreshButton = document.querySelector(".refresh");

let userLocation;

const weather = [];

button.addEventListener("click", (e) => {
  e.preventDefault();

  input.value ? loadResult(input.value) : alert("First You mast type a value!");

  input.value = "";
});

const loadResult = async (valueFromInput) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${valueFromInput}&appid=962e96c7edd5b917153804d1e003d0ff&units=metric`;

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
  } else {
    alert("Sorry we have a problem :(");
  }
};

refreshButton.addEventListener("click", () => {
  location.reload();
});
