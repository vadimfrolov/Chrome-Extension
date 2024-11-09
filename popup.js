document.addEventListener('DOMContentLoaded', function() {
  var button = document.getElementById('myButton');
  var loader = document.getElementById('loader');
  var cards = document.querySelectorAll('.card');

  button.addEventListener('click', async function() {
    // Show the loader and hide the button and cards
    loader.style.display = 'block';
    button.style.display = 'none';
    cards.forEach(card => card.style.display = 'none');

    try {
      const {available, defaultTemperature, defaultTopK, maxTopK } = await ai.languageModel.capabilities();

      if (available !== "no") {
        const session = await ai.languageModel.create();

        // Prompt the model and wait for the whole result to come back.
        const mindEx = await session.prompt("give me a simple exercise to relax");
        const healMeal = await session.prompt("give me an idea for a healthy meal");
        const inspQuo = await session.prompt("give me an inspirational quote");

        // Display the results in the divs
        document.getElementById('mindEx').querySelector('p').innerText = mindEx;
        document.getElementById('healMeal').querySelector('p').innerText = healMeal;
        document.getElementById('inspQuo').querySelector('p').innerText = inspQuo;

        // Show the cards
        cards.forEach(card => card.style.display = 'block');
      } else {
        alert('AI model is not available.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while fetching data.');
    } finally {
      // Hide the loader
      loader.style.display = 'none';
    }
  });
});
