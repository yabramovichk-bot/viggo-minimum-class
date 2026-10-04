const API_URL = "/.netlify/functions/calculate";


const usernameInput =
  document.getElementById("username");

const daySelect =
  document.getElementById("lastActiveDay");

const calcBtn =
  document.getElementById("calcBtn");

const resultBox =
  document.getElementById("resultBox");

const errorBox =
  document.getElementById("errorBox");

const resTotal =
  document.getElementById("resTotal");

const resStudent =
  document.getElementById("resStudent");

const resDetail =
  document.getElementById("resDetail");


async function calculate() {

  const username =
    usernameInput.value.trim();

  const day =
    daySelect.value;


  if (!username) {

    showError(
      "Please enter a username."
    );

    return;
  }


  hideError();

  resultBox.style.display = "none";

  calcBtn.innerText =
    "Searching & Calculating...";

  calcBtn.disabled = true;


  try {

    const url =
      API_URL +
      "?username=" +
      encodeURIComponent(username) +
      "&day=" +
      encodeURIComponent(day);


    const response =
      await fetch(url);


    const data =
      await response.json();


    if (!response.ok || data.error) {

      showError(
        data.error ||
        "Unable to calculate."
      );

      return;
    }


    resultBox.style.display =
      "block";


    resTotal.innerText =
      "Target Minimum: " +
      data.minClass +
      " Class(es)";


    resStudent.innerText =
      "User: " +
      data.username +
      " | Major: " +
      data.major;


    resDetail.innerText =
      "Major Class (M): " +
      data.mCount +
      " | Elective Class (E): " +
      data.eCount;


  } catch (error) {

    console.error(error);

    showError(
      "Unable to connect to the calculator. Please try again."
    );

  } finally {

    calcBtn.innerText =
      "Calculate Minimum Class";

    calcBtn.disabled = false;

  }
}


function showError(message) {

  errorBox.innerText = message;

  errorBox.style.display = "block";

}


function hideError() {

  errorBox.style.display = "none";

}


calcBtn.addEventListener(
  "click",
  calculate
);


usernameInput.addEventListener(
  "keydown",
  function(event) {

    if (event.key === "Enter") {
      calculate();
    }

  }
);