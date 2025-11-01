"use strict";

/*
let allTimer = [];


// #1: Initialize the app
function initApp() {
  console.log("initApp: script.js is loaded");
  gettimer();

}

// #2: Fetch games from JSON file
async function gettimer() {
  const response = await fetch('timetable.json');
  allTimer = await response.json();
  console.log("Timer loaded", allTimer.length);
  console.log(allTimer)
  displayevents(allTimer);
  
}



// #3: Display all games
function displayevents() {
  const timerList = document.querySelector("#movie-list");
  timerList.innerHTML = "";

  if (games.length === 0) {
    timerList.innerHTML = '<p class="no-results">Ingen spil matchede dine filtre 😢</p>';
    return;
  }

  for (const game of games) {
    displayEvent(game);
  }
}

// #4: Render a single game card
function displayEvent(game) {
  const timerList = document.querySelector("#skemagrid");

 const timerHTML = `
  <article class="game-card">
    <div class="game-header">
       <span class="game-tag ${game.difficulty ? game.difficulty.toLowerCase() : 'let'}">
    ${game.difficulty || "Let"}
  </span>
      <button class="fav-btn" aria-label="Gem som favorit">☆</button>
    </div>
    <img src="${game.image}" alt="${game.title}" class="game-image" />
    <div class="game-info">
      <h3 class="game-title">${game.title}</h3>
      <p class="game-genre">${Array.isArray(game.genre) ? game.genre.join(", ") : game.genre}</p>
      <div class="game-details">
        <p><span class="icon">👥</span> ${game.players ? `${game.players.min}-${game.players.max} personer` : ""}</p>
        <p><span class="icon">⏱️</span> ${game.playtime ? `${game.playtime} min.` : ""}</p>
      </div>
    </div>
  </article>
`;

  gameList.insertAdjacentHTML("beforeend", timerHTML);

  const newCard = gameList.lastElementChild;
  newCard.addEventListener("click", function () {
    console.log(`🎮 Klik på: "${game.title}"`);
  });

  newCard.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
    }
  });
}



// Start appen
initApp();
*/


async function getTimetable() {
  try {
    const response = await fetch('timetable.json');
    const data = await response.json();

    // Access the actual array inside the object
    const allEvents = data.events;
    console.log("📅 Events loaded:", allEvents.length);

    const list = document.querySelector("#timetable-list");
    list.innerHTML = "";

    allEvents.forEach(event => {
      const eventHTML = `
        <article class="event-card">
          <div class="event-header">
            <span class="event-tag">${event.teachers || "Ukendt lærer"}</span>
          </div>

          <div class="event-info">
            <h3 class="event-title">${event.summary || "Ukendt fag"}</h3>
            <p class="event-location">📍 ${event.location || "Ingen lokation"}</p>
            <div class="event-details">
              <p><span class="icon">🕒</span> 
                ${new Date(event.start).toLocaleString("da-DK", { 
                  dateStyle: "short", 
                  timeStyle: "short" 
                })} 
                – 
                ${new Date(event.end).toLocaleTimeString("da-DK", { 
                  timeStyle: "short" 
                })}
              </p>
            </div>
          </div>
        </article>
      `;

      list.insertAdjacentHTML("beforeend", eventHTML);
    });
  } catch (err) {
    console.error("⚠️ Fejl ved indlæsning af JSON:", err);
  }
}

document.addEventListener("DOMContentLoaded", getTimetable);
