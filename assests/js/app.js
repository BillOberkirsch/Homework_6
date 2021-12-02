// Global variables
var searchHistory = [];
var currentCity;
var lParentDiv = document.getElementById('rightDiv');
//var uvi;
var requestUrl = "http://api.openweathermap.org/data/2.5/forecast";
var repoList = document.querySelector('ul');
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

//Wjo4Ejo!
//spam email account
//OpenWeather
var apiKey = "4fab0be7bf71652c2dd059b186ba0d86";//Default
apiKey = "548d2e865d70301cc91f4b41aff4f525";//hw6

var txtSearch = $('input[name="CitySearch"]');
var formEl = $('#Weather-Form');

function handleSubmit(event)
{
    event.preventDefault();

    console.log('City to look up: ', txtSearch.val());
    currentCity = txtSearch.val();
    getApi(currentCity);
}
/*Me -- Mine*/
function getApi(currentCity)
{
    console.log("I am in getApi and current city is: " + currentCity);
    var url = requestUrl +"?q=" + currentCity + "&units=imperial&appid=" + apiKey;
     console.log("the url is: " + url);
    //Used postman to test and verify api call.  Used it functionality to convert to JavaScript-fetch
    //then modified it for my needs.  Also used project 4 of section 6.

    fetch(url, requestOptions)
        .then(function(response)
        {
            return response.json();
        })
        .then(function(data)
        {
            display_Weather(data);
        })
       .catch(error => console.log('error', error));
}
/*Me -- Mine*/
function display_Weather(dataObj)
{
    var day;
    var cloud;
    var currentTemp;
    var minTemp;
    var maxTemp;
    var feels_like;
    var cityName = dataObj.city.name;
    console.log("CityName:" + cityName);
    var List = dataObj.list;
    console.log(List);
    for(let i = 0; i < List.length; i+=8)
    {
        day = List[i].dt_txt.slice(0, -9);
        cloud = List[i].clouds.all;
        currentTemp = List[i].main.temp;
        minTemp = List[i].main.temp_min;
        maxTemp = List[i].main.temp_max;
        feels_like = List[i].main.feels_like;
        create_card(day,cloud,currentTemp,minTemp, maxTemp, feels_like);
    }
}

/*Me -- Mine*/
function create_card(day,cloud,ctemp,mintemp,maxtemp,flike)
{
    var newCard = document.createElement("div");
    newCard.className = "card";

    var header = document.createElement("h3");
    header.className="card-header";
    header.textContent = day;

    var cardBody = document.createElement("div");
    cardBody.className="card-body";

    var cardLbl = document.createElement("label");
    cardLbl.textContent = "Cloud Cover: " + cloud + "%";
    cardBody.appendChild(cardLbl);

    cardLbl = document.createElement("label");
    cardLbl.textContent = "Current Temp: " + ctemp;
    cardBody.appendChild(cardLbl);

    cardLbl = document.createElement("label");
    cardLbl.textContent = "High for the Day: " + maxtemp;
    cardBody.appendChild(cardLbl);

    cardLbl = document.createElement("label");
    cardLbl.textContent = "Low for the Day: " + mintemp;
    cardBody.appendChild(cardLbl);

    cardLbl = document.createElement("label");
    cardLbl.textContent = "Feels Like: " + flike;
    cardBody.appendChild(cardLbl);

    newCard.appendChild(header);
    newCard.appendChild(cardBody)


    lParentDiv.append(newCard);
}


formEl.on('submit', handleSubmit);