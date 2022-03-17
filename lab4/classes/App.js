export default class App {
    constructor(API_KEY) {
        // console.log(":-)");
        this.API_KEY = API_KEY;
        this.lat = 0;
        this.lng = 0;
        this.getLocation();
    }

    getLocation() {
        // console.log("Getting location.");
        navigator.geolocation.getCurrentPosition(this.locationSuccess.bind(this), this.locationError.bind(this));
    }

    locationSuccess(location) {
        this.lat = location.coords.latitude;
        this.lng = location.coords.longitude;
        // console.log(location);

        this.getWeather();
    }

    getWeather() {
        // console.log("Getting weather.");
        let url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${this.lat}&lon=${this.lng}&appid=${this.API_KEY}`;
        // console.log(url);

        fetch(url).then((res) => {
            return res.json()
        }).then((json) => {
            console.log(json);
            this.printWeather(json);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            console.log("Finally done.");
        });
    }

    printWeather(json) {
        let summary = json.weather[0].description;
        // console.log(summary);

        let temp = Math.round(json.main.temp);
        // console.log(temp);

        document.querySelector("h1").innerHTML = summary;
        document.querySelector("h2").innerHTML = "It is " + temp + "°C.";

        if(temp <= 10){
            this.getColdWeather();
        }
        else {
            this.getHotWeather();
        }
    }

    getColdWeather() {
        // console.log("Cold weather.");
        let url = "https://api.disneyapi.dev/characters";

        fetch(url)
        .then( result => {
            return result.json();
        })
        .then((json)=>{
            this.printColdWeather(json);
        });
    }

    getHotWeather() {
        // console.log("Hot weather.");
        let url = "https://api.disneyapi.dev/characters";

        fetch(url)
        .then( result => {
            return result.json();
        })
        .then((json)=>{
            console.log(json);
            this.printHotWeather(json);
        });
    }

    printColdWeather(json) {
        let name = json.data[22].name;
        let imageUrl = json.data[22].imageUrl;
        document.querySelector("#image").src = imageUrl;
        document.querySelector("#message").innerHTML = "..." + name;  
    }

    printHotWeather(json) {
        let name = json.data[6].name;
        console.log(name);
        let imageUrl = json.data[6].imageUrl;
        document.querySelector("#image").src = imageUrl;
        document.querySelector("#message").innerHTML = "..." + name;
    }

    locationError(err) {
        console.log(err);
    }
}