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

        document.querySelector("h1").innerHTML = "There are a " + summary + ".";
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
            // console.log(json);
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
            // console.log(json);
            this.printHotWeather(json);
        });
    }

    printColdWeather(json) {
        let name = json.data[2].name;
        let imageUrl = json.data[2].imageUrl;
        document.querySelector("#app").style.backgroundColor = "#EB626C"; 
        document.querySelector("#image").src = imageUrl;
        document.querySelector("#message").innerHTML = "According to " + name + "👾, it's too cold! 🧤❄️"; 
    }

    printHotWeather(json) {
        let name = json.data[42].name;
        console.log(name);
        let imageUrl = json.data[42].imageUrl;
        document.querySelector("#app").style.backgroundColor = "#FDC685"; 
        document.querySelector("#image").src = imageUrl;
        document.querySelector("#message").innerHTML = "According to " + name + "🧜🏻‍♀️, it's time for a refreshing dive! 🥽🦀";
    }

    locationError(err) {
        console.log(err);
    }
}