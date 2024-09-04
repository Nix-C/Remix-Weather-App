# Remix + Tomorrow.io Weather App

This was an exercise to see how we can use Remix to serve API data without exposing our API keys.

I may add additional features in the future, but for now it displays the current temperature/weather and a 5-day forecast.

## How Do We Hide Our API Keys?

In a normal frontend app, all code runs on the client. Doing so would leave our API keys exposed as they must be served to the client (along with the rest of the code) in order to make an API call. To keep our keys secure, we need to run our API calls somewhere else.

By default, Remix supplies a simple server app that renders our site. This means we can run code on the server without the code ever reaching the client.

### Loader Functions ✨

In this app, we're running a special hook in Remix called a `Loader`. This function only runs on the server, but ONLY passes the returned data to the client!

Here's a simplified example of how we're getting our location data:

```
export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  // Get `location` data...
  let forecast: ForecastResponse | null = null;

  //...
  forecast = await getForecast(location); // `getForecast` is using our API key!

  //...
  return forecast
}
```

## Installation

1. Run `npm i` or `npm install`
2. Create a `.env` file with a variable `TOMORROW_API_KEY` containing your key from Tomorrow.io.
3. Run `npm run dev`

![Weather app preview image](image.png)
