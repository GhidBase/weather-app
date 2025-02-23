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
    WeatherSystem.readWeatherToConsole();
  }

  static readWeatherToConsole() {
    console.log(WeatherSystem.weatherData);
  }
}

class GiphySystem {}

class InterfaceManager {
  static dayObjectPath = "templates/day-object.html";
  static containerElement = document.querySelector(".container");
  static dayObjectTemplate;

  static async mainInitialize() {
    await InterfaceManager.setDayObjectTemplate();
    InterfaceManager.initializeWeekObjects();
  }

  static async setDayObjectTemplate() {
    let template = await fetch(InterfaceManager.dayObjectPath);
    template = await template.text();
    let templateElement = document.createElement("template");
    templateElement.innerHTML = template.trim();
    InterfaceManager.dayObjectTemplate = templateElement.content.childNodes[1];
  }

  static initializeDayObject(day) {
    const dayObject = InterfaceManager.dayObjectTemplate.cloneNode(true);
    dayObject.querySelector(".day").textContent = day;
    InterfaceManager.containerElement.appendChild(dayObject);
  }

  static async initializeWeekObjects() {
    InterfaceManager.initializeDayObject("Sunday");
    InterfaceManager.initializeDayObject("Monday");
    InterfaceManager.initializeDayObject("Tuesday");
    InterfaceManager.initializeDayObject("Wednesday");
    InterfaceManager.initializeDayObject("Thursday");
    InterfaceManager.initializeDayObject("Friday");
    InterfaceManager.initializeDayObject("Saturday");
  }
}

// WeatherSystem.getCityWeather("Draper");
InterfaceManager.mainInitialize();

// Main URL
// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/

// Possible Endpoints
// /timeline/[location] – forecast queries.
// /timeline/[location]/[date1]/[date2] – queries for a specific date range.
// Date 1 is either the first date in the range, or the only day being retrieved

// How to log key
// End URL with "?key=BG7EGQBT6TU5U8LX8L6KVE3E5"
