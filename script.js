
//####### here we testing the default example from open-meteo API ######
const getWeatherData = async ()=>{
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m');
    const myJson= await response.json();
    return myJson;
}

//####### here we testing two APIs api64 to get the IP of the client and api.ipstack to get the details of the geographic location ######
const getLocationWeather = async ()=>{
    const ip=await fetch('https://api64.ipify.org?format=json').then(response => response.json()).then(data => data.ip);
    const response = await fetch('http://api.ipstack.com/'+ip+'?access_key=bc25c3f5fb36d013387d644c98881681');
    const myJson= await response.json();
    return myJson;
}


async function main(){
    console.log(await getWeatherData());
    console.log(await getLocationWeather());
}

main();