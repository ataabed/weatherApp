
const weatherAPIKey='651303568a6b4a07935141735240401'


const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"];
var currentCityName ='cairo';

async function fetchData(url, callBack,Error=fetchError)
 {
    await fetch(url)
        .then((response) => {
        
            if (response.ok==true) {
            response.json().then(function(result)
            {
                callBack(result);

            })
            } 
            else
            {
                Error();
            }
      


        })


}
function fetchError()
{
   console.log("Failed to fetch data")
}
function fillLocationData(data)
{
    const CityName=document.querySelector('#City_Name')
    CityName.innerHTML= `${data.country}<br>${data.name}`   ;

}
function fillCurrentWeatherData(data)
{
    const currentCard=document.querySelector('#currentCard')
    const currentCardImage=document.querySelector('#currentCard #imgCurrent')

let currentIcon = `${data["condition"]["icon"]}`.replace("//cdn.weatherapi.com", "./images");
  currentCardImage.setAttribute('src',`${currentIcon}`)
document.querySelector('#textCurrent').innerHTML=`${data["condition"]["text"]}`

document.querySelector('#currentCard .card-title').innerHTML=`${data["temp_c"]} <sup>o</sup>C`
 

}
function fillDayweatherData(data)
{
   // alert(data[0].date)

   data.map(myFunction)

    function myFunction(value, index, array)
    {
        let parentDayDiv;
        switch (index) {
            case 0:
                parentDayDiv=document.querySelector('#card_Today_parent')  
                break;
        case 1:
            parentDayDiv=document.querySelector('#card_tommorow_parent')  

            break;

            case 2:
                parentDayDiv=document.querySelector('#card_AfterTommorow_parent')  

                break;
        }
// header

const d=new Date( array[index].date);
const header_dayName=parentDayDiv.querySelector('.header-dayName')  ;  
header_dayName.innerHTML=days[ d.getDay()]   

const header_dayDate=parentDayDiv.querySelector('.header-Date')  ;  

header_dayDate.innerHTML= `${d.getDate()} ${monthNames[ d.getMonth()] }`

//city name 
const city_Name=parentDayDiv.querySelector('.city_name')  ;  

city_Name.innerHTML=currentCityName;

//temperature degree
const CityTemperture=parentDayDiv.querySelector('.CityTemperture')  ;  
CityTemperture.innerHTML=`${Math.ceil(array[index]['day'].mintemp_c)}<sup>o</sup>C`   
// temperature image 
const temp_image=parentDayDiv.querySelector('.temperature_image_div img')
temp_image.setAttribute('src',`${array[index]['day']['condition']['icon'].replace("//cdn.weatherapi.com", "./images")}`)
// condition text
const Condition_text=parentDayDiv.querySelector('.extra_data .Condition_text')
Condition_text.innerHTML=`<h3>${array[index]['day']['condition']['text']}</h3>`
Condition_text.setAttribute('style','color:#1A9AD8')

// extra info 
//daily_chance_of_rain	
const daily_chance_of_rain=parentDayDiv.querySelector('#extraInfo_div .daily_chance_of_rain')
daily_chance_of_rain.innerHTML=`${ array[index]['day']['daily_chance_of_rain']} %`

// wind
const maxwind_kph=parentDayDiv.querySelector('#extraInfo_div .maxwind_kph')
maxwind_kph.innerHTML=`${ array[index]['day']['maxwind_kph']} km/h`

const wind_dir=parentDayDiv.querySelector('#extraInfo_div .wind_dir')
wind_dir.innerHTML=`${ array[index]['hour'][0]['wind_dir']} `



} 
      

}
function callBack(x) {
 const {current,forecast,location }=x; 
fillLocationData(location);
fillCurrentWeatherData(current);
const {forecastday}=forecast
fillDayweatherData(forecastday)
}

function getWeatherInfo(cityName)
{
    //http://api.weatherapi.com/v1/forecast.json?key=651303568a6b4a07935141735240401&q=London&days=3&aqi=no&alerts=no
    
    const url=`https://api.weatherapi.com/v1/forecast.json?key=${weatherAPIKey}&q=${cityName}&days=3&aqi=no&alerts=no`
  
        fetchData(url, callBack)
        .then(() => { console.log("Finished") });

}

getWeatherInfo(currentCityName);

function SeacrhCityWeatherInfo(cityName)
{
    getWeatherInfo(cityName);
}
document.querySelector('#seachCityName').addEventListener('click',function(){
const cityName=document.querySelector('#inputCityName');
  
currentCityName=cityName.value
SeacrhCityWeatherInfo(currentCityName);
  cityName.value="";
  
})

//images


