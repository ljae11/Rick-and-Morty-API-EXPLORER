# Rick-and-Morty-API-EXPLORER

An interactive web app that lets you explore characters from Rick and Morty using the official Rick and Morty API. Discover characters, their status, species, gender, last location, and last episode, all while enjoying a themed video and music background.

# Features

Search characters by name.

Filter characters by status (Alive, Dead, Unknown).

Displays:

Name

Image

Status

Species

Gender

Type

Last known location

Last episode appearance

Pagination for large datasets.

Character cards open in a modal with a close button.

Background video and looping theme music.

Loader animation while fetching data.

Smooth fade transitions between homepage and catalog.

# How to Use

Open index.html in a modern browser.

On the homepage, click "Let's Explore" to go to the catalog.

Use the search box to look for characters by name.

Use the status filter after searching to narrow results.

Click a character card to view detailed info in a modal.

Use the pagination buttons to navigate multiple pages.

Click "Home" in the navbar to return to the homepage.

# Technology

HTML5 – Page structure

CSS3 – Styling, video background, loaders, animations

JavaScript – API calls, DOM manipulation, pagination, filters

Rick and Morty API – Character data

# How It Works

User searches for a character or navigates pages.

JavaScript fetches data from the Rick and Morty API with optional filters.

Character cards are displayed in a responsive grid.

Clicking a card opens a modal overlay with detailed information.

Background video plays automatically, and theme music loops.

# Customization

Change the background video by replacing the video file in photos/.

Change the theme music by replacing the MP3 in music/.

Modify styles in style.css for colors, fonts, card layouts, or animations.

# Project Structure

index.html – Main HTML page

style.css – CSS styles, animations, loaders

script.js – JavaScript logic, API calls, modal handling

music/ – Background music file

photos/ – Background video and logos

# Future Improvements

Add more filters (species, gender, origin).

Include character sorting options.

Add Rick and Morty themed animations and sound effects.

Enhance mobile responsiveness.

Implement infinite scroll for character grid.

#API Reference

[Rick and Morty API](https://rickandmortyapi.com/)
