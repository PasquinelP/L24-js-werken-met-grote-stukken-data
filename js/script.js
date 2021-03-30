const navButtons = document.querySelectorAll(".buttons button");
const resultsList = document.querySelector("#results");
const countriesButton = document.querySelector("button#landenlijst");
const womenButton = document.querySelector("button#steenbokvrouwen");

// clear list
const emptyList = () => {
  resultsList.innerHTML = "";
};

// // each button click clears the list
navButtons.forEach((navButton) => {
  navButton.addEventListener("click", () => {
    emptyList();
  })
});

/*
Subopdracht: landenlijst - 1 punt
Maak een lijst van alle landen, gesorteerd op naam van het land.
*/

// get all countries and sort them
// remove any duplicates
// send result to add to list function
const getCountries = () => {
  const countries = randomPersonData
    .map((person) => person.region)
    .sort();
  const uniqueCountries = Array.from(new Set(countries));
  addToList(uniqueCountries);
};

// add countries to list
const addToList = (items) => {
  items.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = item;
    resultsList.appendChild(listItem);
  });
};

countriesButton.addEventListener("click", getCountries);


/*
Subopdracht: steenbokvrouwen - 3 punten

Maak een lijst van mensen:

    laat voor- en achternaam en hun foto zien
    sorteer de lijst op voornaam
    elke persoon op die lijst moet
        vrouw zijn
        ouder zijn dan 30 (1990 of ouder)
        een steenbok zijn (jarig van 22 december t/m 19 januari)
*/

// find persons that are women and over 30
// sort the list on first name
const isWomanOverThirty = randomPersonData
  .filter((person) => person.gender === "female" && person.age > 30)
  .sort((a, b) => (a.name > b.name ? 1 : -1));

// find all women that have capricorn as sign
const isCapricornWomen = (person) => {
  const birthday = person.birthday.dmy; // result: 14/10/1985
  const birthdayToArray = birthday.split("/"); // result: ["14", "10", "1985"]
  const bdDay = parseInt(birthdayToArray[0]); // result: 14
  const bdMonth = parseInt(birthdayToArray[1]); // result: 10

  // capricorns born between 22-12 and 19-01
  if (bdMonth === 12 && bdDay >= 22) {
    return true;
  }
  if (bdMonth === 1 && bdDay <= 19) {
    return true;
  }
};

// get all women over thirty and with capricorn sign
const capricornWomenOverThirty = isWomanOverThirty.filter(isCapricornWomen);

// create img element for person photo
const createImgElement = (photo) => {
  const personImg = document.createElement("img");
  personImg.src = photo;
  return personImg;
};

// add result to list
// show name, surname and photo
const addCapricornWomenToList = () => {
  capricornWomenOverThirty.forEach((person) => {
    const name = person.name;
    const surName = person.surname;
    const photo = person.photo;
    const photoImg = createImgElement(photo);

    const womenName = document.createElement("span");
    womenName.innerHTML = `${name} ${surName}`;

    const listItem = document.createElement("li");
    listItem.appendChild(photoImg);
    listItem.appendChild(womenName);
    resultsList.appendChild(listItem);
  });
};

womenButton.addEventListener("click", addCapricornWomenToList);
