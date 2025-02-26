class WeatherSystem {
  // setting variables
  // static variable = thing
  static key = "BG7EGQBT6TU5U8LX8L6KVE3E5";
  static city;
  static weatherData;

  static async getCityWeather(city) {
    const request = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${WeatherSystem.key}`;
    const weatherPromise = await fetch(request, { mode: "cors" });
    WeatherSystem.weatherData = await weatherPromise.json();
    return WeatherSystem.weatherData;
  }

  static readWeatherToConsole() {
    console.log(WeatherSystem.weatherData);
  }
}

class GiphySystem {}

class InterfaceManager {
  static dayObjectPath = "./templates/day-object.html";
  static containerElement = document.querySelector(".container");
  static searchButton = document.getElementById("search-button")
  static cityInputField = document.getElementById("city");
  static dayObjectTemplate;
  static dayObjectsArray = [];
  static dayOfWeekArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  static async mainInitialize() {
    await InterfaceManager.setDayObjectTemplate();
    InterfaceManager.initializeWeekObjects();
    InterfaceManager.searchButton.addEventListener("click", async () => {
      await InterfaceManager.getWeatherReport(InterfaceManager.cityInputField.value);
      InterfaceManager.appendWeekObjects();
      InterfaceManager.dayObjectsArray.forEach((element, index) => {
        InterfaceManager.setDayObjectFields(index, WeatherSystem.weatherData.days[index].temp, WeatherSystem.weatherData.days[index].conditions)
      })
    });
  }

  static async getWeatherReport(city) {
    event.preventDefault();
    await WeatherSystem.getCityWeather(city);
  }

  static async setDayObjectTemplate() {
    let template = await fetch(InterfaceManager.dayObjectPath);
    template = await template.text();
    let templateElement = document.createElement("template");
    templateElement.innerHTML = template.trim();
    InterfaceManager.dayObjectTemplate = templateElement.content.childNodes[1];
  }

  static initializeDayObject() {
    const dayObject = InterfaceManager.dayObjectTemplate.cloneNode(true);
    console.log("Day Init finished")
    return dayObject;
  }

  static async initializeWeekObjects() {
    InterfaceManager.dayObjectsArray = [];
    InterfaceManager.dayObjectsArray.push(InterfaceManager.initializeDayObject());
    InterfaceManager.dayObjectsArray.push(InterfaceManager.initializeDayObject());
    InterfaceManager.dayObjectsArray.push(InterfaceManager.initializeDayObject());
    InterfaceManager.dayObjectsArray.push(InterfaceManager.initializeDayObject());
    InterfaceManager.dayObjectsArray.push(InterfaceManager.initializeDayObject());
    InterfaceManager.dayObjectsArray.push(InterfaceManager.initializeDayObject());
    InterfaceManager.dayObjectsArray.push(InterfaceManager.initializeDayObject());
    console.log("Week Init Finished");
  }

  static appendWeekObjects() {
    InterfaceManager.dayObjectsArray.forEach((element, index) => InterfaceManager.containerElement.appendChild(element))
  }

  static removeWeekDayElements() {
    InterfaceManager.dayObjectsArray.forEach((element, index) => InterfaceManager.containerElement.removeChild(InterfaceManager.dayObjectsArray[index]))
  }

  static setDayObjectFields(dayObjectIndex, temperature, conditions) {
    const dayOfWeekString = InterfaceManager.dayOfWeekArray[new Date(WeatherSystem.weatherData.days[dayObjectIndex].datetime).getDay()];
    InterfaceManager.dayObjectsArray[dayObjectIndex].querySelector(".day").textContent = dayOfWeekString;
    InterfaceManager.dayObjectsArray[dayObjectIndex].querySelector(".temp").textContent = temperature;
    InterfaceManager.dayObjectsArray[dayObjectIndex].querySelector(".conditions").textContent = conditions;
  }
}

// WeatherSystem.getCityWeather("Draper");
InterfaceManager.mainInitialize()

// Main URL
// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/

// Possible Endpoints
// /timeline/[location] – forecast queries.
// /timeline/[location]/[date1]/[date2] – queries for a specific date range.
// Date 1 is either the first date in the range, or the only day being retrieved

// How to log key
// End URL with "?key=BG7EGQBT6TU5U8LX8L6KVE3E5"
