
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
  }

  static readWeatherToConsole() {
    console.log(WeatherSystem.weatherData);
  }

  // making functions
  // static functionName() {}
}

class GiphySystem {}

class InterfaceManager {}

(async () => {
  await WeatherSystem.getCityWeather("draper");
  WeatherSystem.readWeatherToConsole();
})();

// Main URL
// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/

// Possible Endpoints
// /timeline/[location] – forecast queries.
// /timeline/[location]/[date1]/[date2] – queries for a specific date range.
// Date 1 is either the first date in the range, or the only day being retrieved

// How to log key
// End URL with "?key=BG7EGQBT6TU5U8LX8L6KVE3E5"
