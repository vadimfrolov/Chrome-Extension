document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("myButton");
  const loader = document.getElementById("loader");
  const mainTitle = document.getElementById("mainTitle");
  const introText = document.getElementById("introText");
  const cards = document.querySelectorAll(".card");
  const firstPage = document.querySelector(".firstPage");
  const featurList = document.getElementById("features");

  const now = new Date();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = now.getDate();
  const month = months[now.getMonth()];

  const formattedDate = `${day} ${month}`;

  function createExerciseCard(text) {
    return `
      <h2>Relaxation Exercise</h2>
      <p>${text}</p>
    `;
  }

  function createMealCard(text) {
    return `
      <h2>Fun fact for ${formattedDate}</h2>
      <p>${text}</p>
    `;
  }

  function createEnergyHabitCard(text) {
    return `
      <h2>Productivity tip</h2>
      <p>${text}</p>
    `;
  }

  function createQuoteCard(text) {
    return `
      <p class="quote-text">${text}</p>
    `;
  }

  button.addEventListener("click", async function () {
    loader.style.display = "block";
    button.style.display = "none";
    introText.style.display = "none";
    featurList.style.display = "none";
    cards.forEach((card) => (card.style.display = "none"));

    mainTitle.innerText =
      "Our best employee is already looking for information";

    try {
      const { available } = await ai.languageModel.capabilities();

      if (available !== "no") {
        const session = await ai.languageModel.create({
          systemPrompt:
            "Please provide responses in English wihout any formatting",
        });

        // Get the exercise data
        const mindExResponse = await session.prompt(
          "give me a simple exercise to relax in less than 100 words"
        );

        // Get the meal data
        const healMealResponse = await session.prompt(
          `give me a fun fact for ${formattedDate}`
        );

        const EnergyHabitResponse = await session.prompt(
          "give me a new daily productivity tip"
        );

        // Get the inspirational quote
        const inspQuo = await session.prompt(
          "give me a new inspirational quote"
        );

        session.destroy();

        // Update the DOM with formatted content
        document.getElementById("mindEx").innerHTML =
          createExerciseCard(mindExResponse);
        document.getElementById("healMeal").innerHTML =
          createMealCard(healMealResponse);
        document.getElementById("inspQuo").innerHTML = createQuoteCard(inspQuo);
        document.getElementById("energyHabit").innerHTML =
          createEnergyHabitCard(EnergyHabitResponse);

        firstPage.style.display = "none";

        console.log(mindExResponse, healMealResponse, inspQuo);

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
