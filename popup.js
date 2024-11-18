document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("myButton");
  const loader = document.getElementById("loader");
  const mainTitle = document.getElementById("mainTitle");
  const introText = document.getElementById("introText");
  const cards = document.querySelectorAll(".card");
  const firstPage = document.querySelector(".firstPage");
  const featurList = document.getElementById("features");

  function createExerciseCard(text) {
    return `
      <h2>Relaxation Exercise</h2>
      <p>${text}</p>
    `;
  }

  function createMealCard(text) {
    return `
      <h2>Fun fact</h2>
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

  function addCardClickHandlers() {
    document.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("click", async function () {
        const paragraph = this.querySelector("p");
        if (!paragraph) return;

        try {
          await navigator.clipboard.writeText(paragraph.textContent);
          this.classList.add("copied");
          setTimeout(() => {
            this.classList.remove("copied");
          }, 1500);
        } catch (err) {
          console.error("Failed to copy text: ", err);
        }
      });
    });
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
            "Please provide responses in English without any formatting",
        });

        const mindExResponse = await session.prompt(
          "give me a simple exercise to relax in less than 100 words"
        );

        const healMealResponse = await session.prompt(`
          Share an interesting and educational fun fact that:
          - Is scientifically accurate and verified
          - Relates to science, nature, history, or human achievement
          - Is surprising or counter-intuitive
          - Is easily understandable
          - Has not been widely circulated on social media
          - Is engaging and conversation-worthy
          - Must be 2-3 sentences maximum
          `);

          const EnergyHabitResponse = await session.prompt(
            "give me a new daily productivity tip"
          );

        const inspQuo = await session.prompt(`
          Generate a meaningful and impactful inspirational quote that should be:
          - From a well-known historical figure, thought leader, or philosopher
          - Focus on themes of personal growth, resilience, success, or inner strength
          - Between 10-20 words in length
          - Not cliché or overused
          - Include attribution to the author
          - Format the response as: "Quote" - Author
          
          Please exclude quotes about failure, negativity, or hardship. Focus on motivation and positive change.
          `);

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

        // Show all cards
        cards.forEach((card) => {
          card.style.display = "block";
        });

        // Add click handlers to cards after they're populated
        addCardClickHandlers();
      } else {
        throw new Error("AI model is not available.");
      }
    } catch (error) {
      console.error("Error:", error);
      mainTitle.innerText = "An error occurred. Please try again later.";
      introText.style.display = "block";

      if (
        error.name === "ReferenceError" &&
        error.message.includes("ai is not defined")
      ) {
        introText.innerText =
          "Sorry, but looks like your browser is not supporting Chrome AI";
      } else {
        introText.innerText =
          "We're sorry, but we couldn't fetch the data at this time.";
      }
    } finally {
      loader.style.display = "none";
      mainTitle.style.display = "none";
    }
  });
});
