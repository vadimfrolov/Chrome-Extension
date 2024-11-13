document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("myButton");
  const loader = document.getElementById("loader");
  const mainTitle = document.getElementById("mainTitle");
  const introText = document.getElementById("introText");
  const cards = document.querySelectorAll(".card");

  function extractJSONFromResponse(response) {
    // Remove markdown code block syntax and any surrounding whitespace
    const jsonStart = response.indexOf("{");
    const jsonEnd = response.lastIndexOf("}") + 1;
    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("No valid JSON found in response");
    }
    return response.slice(jsonStart, jsonEnd);
  }

  function createExerciseCard(data) {
    return `
            <h2>${data.title}</h2>
            <p class="duration">Duration ⏱️: ${
              data.durationMinutes
            } minute${data.durationMinutes !== "1" ? "s" : ""}</p>
            <ul>
              ${data.steps.map((step) => `<li>${step}</li>`).join("")}
            </ul>
          `;
  }

  function createMealCard(data) {
    return `
            <h2>${data.title}</h2>
            <p class="duration">Preparation time ⏲️: ${
              data.durationMinutes
            } minute${data.durationMinutes !== "1" ? "s" : ""}</p>
            <p><strong>Why it's good for you:</strong> ${
              data.whyThisMealIsGood
            }</p>
            <strong>Steps:</strong>
            <ul>
              ${data.steps.map((step) => `<li>${step}</li>`).join("")}
            </ul>
          `;
  }

  function createQuoteCard(quote) {
    return `<p class="quote-text">${quote}</p>`;
  }

  button.addEventListener("click", async function () {
    // Show the loader and hide other elements
    loader.style.display = "block";
    button.style.display = "none";
    introText.style.display = "none";
    cards.forEach((card) => (card.style.display = "none"));

    mainTitle.innerText =
      "Our best employee is already looking for information";

    try {
      const { available } = await ai.languageModel.capabilities();

      if (available !== "no") {
        const session = await ai.languageModel.create();

        // Get and parse the exercise data
        const mindExResponse =
          await session.prompt(`give me a simple exercise to relax in less than 100 words with this result structure as json:
              {
                "title": "string",
                "durationMinutes": "number",
                "steps": "string[]"
              }`);
        const mindExJson = extractJSONFromResponse(mindExResponse);
        const mindExData = JSON.parse(mindExJson);

        // Get and parse the meal data
        const healMealResponse =
          await session.prompt(`give me a meal receipt in less than 100 words with this result structure as json:
              {
                "title": "string",
                "durationMinutes": "number",
                "whyThisMealIsGood": "string",
                "steps": "string[]"
              } with 3-5 steps`);
        const healMealJson = extractJSONFromResponse(healMealResponse);
        const healMealData = JSON.parse(healMealJson);

        // Get the inspirational quote
        const inspQuo = await session.prompt(
          "give me a new inspirational quote"
        );

        // Update the DOM with formatted content
        document.getElementById("mindEx").innerHTML =
          createExerciseCard(mindExData);
        document.getElementById("healMeal").innerHTML =
          createMealCard(healMealData);
        document.getElementById("inspQuo").innerHTML = createQuoteCard(inspQuo);

        // Show all cards
        cards.forEach((card) => {
          card.style.display = "block";
        });
      } else {
        throw new Error("AI model is not available.");
      }
    } catch (error) {
      console.error("Error:", error);
      mainTitle.innerText = "An error occurred. Please try again later.";
      introText.style.display = "block";
      introText.innerText =
        "We're sorry, but we couldn't fetch the data at this time.";
    } finally {
      // Hide the loader and title
      loader.style.display = "none";
      mainTitle.style.display = "none";
    }
  });
});
