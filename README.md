# Crypto Reports View
## Setup 
- Install all dependencies by running `npm install` command. 
- Get your API Key from https://www.cryptocompare.com/cryptopian/api-keys
  . After login, click on 'Create an API Key' or if you have already generated click on 'Add another api key'
  . Enter a name then check `Read All Price Streaming and Polling Endpoints` and click `Add` green button
  . Copy the API Key.
- Copy `.env.sample` to `.env` file in the root directory and past the API key that you copied after `REACT_APP_CRYPTOCOMARE_API_KEY=`.
**Note:** I know this solution is not the best but I don't want to store my API key in the .env but we can save it in the backend or use Next.js.

## Deployment
Run `npm start` go to `localhost:3000` in your browser to see it;


## Build