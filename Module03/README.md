# Weather App

This project is part of the Piscine Mobile module and consists of creating a weather application that retrieves real-time weather data. The application utilizes various APIs to retrieve location coordinates, city names, and weather information.

## Exercise 00: Where are we?

In this exercise, the focus is on implementing geolocation functionality using the device's GPS. The application should request permission from the user to access their location. If permission is granted, the coordinates should be retrieved and used to fetch the weather data. If permission is denied, the user can still manually enter a city name to get the weather information.

Exercise 01: Searcher
The Searcher exercise involves implementing a search functionality in the application. Users can enter a city name, country, or region to retrieve the weather data. The application uses the Geocoding API to convert the entered location into coordinates or vice versa. The user is presented with a suggestion list of cities that match their search, and they can select a city to fetch the weather information.

## Exercise 02: Fill the views

In this exercise, the application's views are populated with weather data. The app consists of three tabs: "Current," "Today," and "Weekly." In the "Current" tab, the location, current temperature, weather description, and wind speed are displayed. The "Today" tab shows the weather forecast for the day, including hourly temperatures, weather descriptions, and wind speeds. The "Weekly" tab displays the weather forecast for each day of the week, including the date, minimum and maximum temperatures, and weather descriptions.

## Exercise 03: What’s wrong with you!

The final exercise focuses on error handling. The application should handle cases where the user enters a non-existent city name or when there is a failure in the API connection. In such cases, the user should be informed that the city name is invalid or that there is a connection issue. The error message should persist until a valid city name is entered or the API connection is successful.

Please refer to the respective exercise instructions for more details on implementation and turn-in requirements.

Note: The design aspect of the application is not a priority in this module, and the emphasis is on displaying the weather information correctly. Design improvements can be made in future modules.

<p align="center">
  <img width="400" src="assets/Screenshot.png">
</p>
