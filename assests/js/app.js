// Global variables
var searchCities = [];
var currentCity;
var rParentDiv = document.getElementById('rightDiv');//right parent div

var requestUrl = "http://api.openweathermap.org/data/2.5/forecast";
var btnFrmEl = document.getElementById('btn-Form');


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

    currentCity = txtSearch.val();
    getApi(currentCity);
    save_ToStorage();
}
/*Me -- Mine*/
function getApi(currentCity)
{
    var url = requestUrl +"?q=" + currentCity + "&units=imperial&appid=" + apiKey;
    console.log(url);
    //Used postman to test and verify api call.  Used it functionality to convert to JavaScript-fetch
    //then modified it for my needs.  Also used project 4 of section 6.

    fetch(url, requestOptions)
        .then(function(response)
        {
            return response.json();
        })
        .then(function(data)
        {
            removeAllChildNodes(rParentDiv);
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
    var List = dataObj.list;
    
    for(let i = 0; i < List.length; i+=8)
    {
        day = List[i].dt_txt.slice(0, -9);
        cloud = List[i].clouds.all;
        currentTemp = List[i].main.temp;
        minTemp = List[i].main.temp_min;
        maxTemp = List[i].main.temp_max;
        feels_like = List[i].main.feels_like;
        create_card(day,cloud,currentTemp,minTemp, maxTemp, feels_like, cityName);
    }
}

/*Me -- Mine*/
function create_card(day,cloud,ctemp, mintemp, maxtemp, flike, cityName)
{
    var newCard = document.createElement("div");
    newCard.className = "card";

    var header = document.createElement("h3");
    header.className="card-header";
    header.textContent = day;

    var cardBody = document.createElement("div");
    cardBody.className="card-body";

    var cardLbl = document.createElement("label");
    cardLbl.textContent = "For the city of " + cityName;
    cardBody.appendChild(cardLbl);

    cardLbl = document.createElement("label");
    cardLbl.textContent= "Cloud Cover: " + cloud + "%";
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


    rParentDiv.append(newCard);
}

//javascript tutorial https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
function removeAllChildNodes(parent)
{
    console.log(parent);
    while (parent.firstChild) 
    {
        parent.removeChild(parent.firstChild);
    }
}

function save_ToStorage()
{
     if(!searchCities.includes(currentCity))//w3schools.com
     {
         searchCities.push(currentCity);
        localStorage.setItem("searchCities", JSON.stringify(searchCities));
        console.log("search cities: " + searchCities);
        show_Cities();
     }
    console.log("IN save_ToStorage, current city is:" + currentCity);
    
}

function show_Cities()
{
    removeAllChildNodes(btnFrmEl);
    if(searchCities.length !==0)
    {
        for(var i = 0; i < searchCities.length; i++)
        {
            if(searchCities[i] !== '')
            {
                var btEl = document.createElement('button');
                btEl.textContent =searchCities[i];
                btEl.classList="btn btn-success"
                btEl.type = "button";
                btEl.addEventListener("click", get_city);
                btnFrmEl.appendChild(btEl);
            }
        }
    }
}

function get_city(event)
{
    event.preventDefault();
    currentCity = event.target.textContent;
    getApi(currentCity);
    //txtSearch.val() = currentCity;
}

function get_Cities()
{
    var s_cities = JSON.parse(localStorage.getItem("searchCities"));
    if(s_cities !== null)
    {
        searchCities = s_cities;
        console.log(searchCities);
        show_Cities(searchCities);
    }
}

function Clear()
{
    console.log("hello in clear!");
    removeAllChildNodes(rParentDiv);

}
function Clear_All()
{
    localStorage.clear();
    removeAllChildNodes(rParentDiv);
    removeAllChildNodes(btnFrmEl);

}

formEl.on('submit', handleSubmit);


function init()
{
    //localStorage.clear();
    get_Cities();
}

init();