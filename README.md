## Wiki-Search - About

I created the Wiki-search project using React. I originally learned Vue.js so this was fun for me to work with something different. I integrated the Wikipedia API so that the user can type in anything into the search box to find relevant Wikipedia articles. There is also a button to generate a randomized search for anyone that wants to be surprised! Each topic has a text preview and the user can click “Read More” to be directed to the Wikipedia page. The app also tells you how many search results were found and displays the top 50 results.

The React app was already functioning as needed and met all necessary requirements without the need for a backend, so there was no need to incorporate a Ruby on Rails backend. HOWEVER! I started adding a rails backend to experiement with different features. Currently I have added a bookmarking feature. There will be more to come. But for now, users can bookmark their favorite Wikipedia articles and view them in a list! If you run this app without the Rails backend, the site will still function, but you will not be able to bookmark anything.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

Requirements to run this project:

Node Package Manager (NPM)
React

Clone or download this repository. In the project directory, run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser. 

NOTE: To utilize this with the newly built Rails backend, start the rails server first, then run 'npm start' and agree to launch the server on [http://localhost:3001](http://localhost:3001)

You can search for Wiki entries. Typos will yield a "no results found" message. 
Click "Random Search" for a random Wiki entry. Clicking "Read More" takes you to the Wikipedia page.

<img width="1388" alt="Screenshot 2023-05-23 at 10 36 14 AM" src="https://github.com/ianiyengar/wiki-search/assets/83172663/90620f12-aee8-4848-b525-bf0b1b1f31b6">
