# Spotify Track Counter

Spotify Track Counter is a Node.js project that interacts with the Spotify API to count all the tracks of a Spotify user. This functionality is not available in the original Spotify app, but this project allows users to easily count their tracks and view the total number.

## Installation

To get started, clone this repository and install the necessary dependencies using npm:

git clone https://github.com/your-username/spotify-track-counter.git
cd spotify-track-counter
npm install

## Usage

To use Spotify Track Counter, you'll need to obtain a Spotify client ID and client secret by registering your app on the Spotify Developer Dashboard. Once you have your client ID and secret, create a .env file in the config folder of the project and add the following:

PORT=your_app_port
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
SESSION_SECRET=your_session_secret

Next, start the app by running npm start:

npm start

Once the app is running, you can visit http://localhost:3000 in your web browser and click on the login link to authorize the app to access your Spotify account. After you've authorized the app, you will be redirected to a page with a bunch of options. Then click on the "Count Tracks" and you are done.

# Contributing

If you'd like to contribute to this project, feel free to submit a pull request! Please ensure that your code follows the existing style and that you've tested your changes thoroughly.

# Acknowledgements

This project was inspired by the lack of a track counting feature in the original Spotify app. Special thanks to the Spotify Developer team for providing an easy-to-use API that made this project possible.