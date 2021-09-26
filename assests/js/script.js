{

const forecastDiv = document.getElementById("forecast");


//this is setting up teh 5-day forecast dive //<div id="forecast">
//and this works
for(let i=1; i <=5; i++)
{
    const WeatherCard = document.createElement("div");
    WeatherCard.className="card";
    WeatherCard.id="forecast-" + i;
    forecastDiv.appendChild(WeatherCard);
} 