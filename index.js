const apiKey = "8968214ec2b211dd2dced06d2e331c29";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status === 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();

        document.querySelector(".error").style.display = "none";

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + " °C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
        document.querySelector(".WIND").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "pictures/cloudy.png";
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "pictures/RAIN5.png";
        } else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "pictures/haze.png";
        } else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "pictures/mist.png";
        } else if (data.weather[0].main === "Clear") {
            weatherIcon.src = "pictures/sunny.png";
        } else if (data.weather[0].main === "Snow") {
            weatherIcon.src = "pictures/snow.png";
        }

        const timezoneOffset = data.timezone;
        const nowUTC = new Date();
        const localTime = new Date(nowUTC.getTime() + timezoneOffset * 1000);

        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const localDate = localTime.toLocaleDateString('fr-FR', dateOptions);
        document.querySelector(".datetime").innerHTML = localDate;

        document.querySelector(".weather").style.display = "block";

        //  Envoi vers PHP
        fetch('insert.php', {
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify({
city: data.name,
temperature: Math.round(data.main.temp),
humidity: data.main.humidity,
description: data.weather[0].description, // Ajout de la description
date: localDate
})
});

    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

