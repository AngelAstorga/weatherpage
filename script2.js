
//####### here we testing the default example from open-meteo API ######
const getWeatherData = async (latitude,longitude)=>{
    console.log(latitude)
    console.log(longitude)
    var currentDate = new Date();
    var oldDate= currentDate.getFullYear()+"-"+fixDate(currentDate.getMonth())+"-"+fixDate(currentDate.getDay());
    const response = await fetch('https://archive-api.open-meteo.com/v1/archive?latitude=52.52&longitude=13.41&start_date='+oldDate+'&end_date='+oldDate+'&hourly=temperature_2m');
    const myJson= await response.json();
    console.log(myJson)
    return myJson;
}

//##### function to fix the numbers that have only one digit in the day and month
const fixDate =(number)=>{
    if(number < 10 ){
        return "0"+number.toString()
    }else{
        return number;
    }
    
}


//####### here we testing two APIs api64 to get the IP of the client and ip-api to get the details of the geographic location ######
const getLocationWeather = async ()=>{
    const ip=await fetch('https://api64.ipify.org?format=json').then(response => response.json()).then(data => data.ip);
    console.log(ip)
    const response = await fetch('http://ip-api.com/json/'+ip);
    const myJson= await response.json();
    return myJson;
}


async function main(){

    locationJson=await getLocationWeather();
    weatherJson=await getWeatherData(locationJson.lat, locationJson.lon); // sending the current location to get the weather

    //### to check in console the structure of the data
    console.log(locationJson);
    console.log(weatherJson);

    //### showing the results in index.html
    document.getElementById('country').innerHTML = locationJson.country;
    document.getElementById('region').innerHTML = locationJson.regionName;

    var currentDate = new Date();
    var time= currentDate.getHours();

    document.getElementById('temperature').innerHTML = weatherJson.hourly.temperature_2m[time] + " °C";
}

main();