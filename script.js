
//####### here we testing the default example from open-meteo API ######
const getWeatherData = async (latitude,longitude)=>{
    console.log(latitude)
    console.log(longitude)
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude='+latitude.toPrecision(4).toString()+'&longitude='+longitude.toPrecision(4).toString()+'&current=temperature_2m,wind_speed_10m&temperature_unit=celsius');
    const myJson= await response.json();
    return myJson;
}

//####### here we testing two APIs api64 to get the IP of the client and api.ipstack to get the details of the geographic location ######
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
    document.getElementById('temperature').innerHTML = weatherJson.current.temperature_2m + " °C";
}

main();