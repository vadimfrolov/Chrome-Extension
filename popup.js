document.addEventListener("DOMContentLoaded", function () {
  var button = document.getElementById("myButton");
  var loader = document.getElementById("loader");
  var mainTitle = document.getElementById("mainTitle");
  var introText = document.getElementById("introText");
  var gridContainer = document.querySelector(".grid-container");
  var cards = document.querySelectorAll(".box");

  button.addEventListener("click", async function () {
    // Show the loader and hide the button, intro text, and cards
    loader.style.display = "block";
    button.style.display = "none";
    introText.style.display = "none";
    cards.forEach((card) => (card.style.display = "none"));

    // Change the title text while loading
    mainTitle.innerText =
      "Our best employee is already looking for information";

    try {
      const { available, defaultTemperature, defaultTopK, maxTopK } =
        await ai.languageModel.capabilities();

      if (available !== "no") {
        const session = await ai.languageModel.create();

        // Prompt the model and wait for the whole result to come back.
        const mindEx =
          await session.prompt(`give me a simple exercise to relax in less than 100 words with this result structure as json:

{
  "title": "string",
  "durationMinutes": "number",
  "steps": "string[]"
}

there should be from 3 to 5 steps in array`);
        const healMeal =
          await session.prompt(`give me a meal receipt in less than 100 words with this result structure as json:

{
  "title": "string",
  "durationMinutes": "number",
  "whyThisMealIsGood": "string",
  "steps": "string[]"
}

there should be from 3 to 5 steps in array`);
        const inspQuo = await session.prompt(
          "give me a new inspirational quote"
        );

        // Display the results in the divs
        document.getElementById("mindEx").querySelector("p").innerText = mindEx;
        document.getElementById("healMeal").querySelector("p").innerText =
          healMeal;
        document.getElementById("inspQuo").querySelector("p").innerText =
          inspQuo;

        // Show the cards and the grid container
        cards.forEach((card) => {
          if (card.querySelector("p").innerText.trim() !== "") {
            card.style.display = "block";
          }
        });
        gridContainer.style.display = "grid";
      } else {
        alert("AI model is not available.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching data.");
    } finally {
      // Hide the loader and the title
      loader.style.display = "none";
      mainTitle.style.display = "none";
    }
  });
});
