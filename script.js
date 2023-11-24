document.addEventListener("DOMContentLoaded", function () {
  // Add something to given element placeholder
  function addToPlaceholder(toAdd, el) {
    el.attr("placeholder", el.attr("placeholder") + toAdd);
    // Delay between symbols "typing"
    return new Promise((resolve) => setTimeout(resolve, 100));
  }

  // Clear placeholder attribute in given element
  function clearPlaceholder(el) {
    el.attr("placeholder", "");
  }

  // Print one phrase
  function printPhrase(phrase, el) {
    return new Promise((resolve) => {
      // Clear placeholder before typing the next phrase
      clearPlaceholder(el);
      let letters = phrase.split("");
      // For each letter in the phrase
      letters.reduce(
        (promise, letter, index) =>
          promise.then((_) => {
            // Resolve promise when all letters are typed
            if (index === letters.length - 1) {
              // Delay before starting the next phrase "typing"
              setTimeout(resolve, 1000);
            }
            return addToPlaceholder(letter, el);
          }),
        Promise.resolve()
      );
    });
  }

  // Print given phrases to the element
  function printPhrases(phrases, el) {
    // For each phrase
    // wait for the phrase to be typed
    // before starting to type the next one
    return phrases.reduce(
      (promise, phrase) => promise.then((_) => printPhrase(phrase, el)),
      Promise.resolve()
    );
  }

  // Start typing
  function run() {
    let phrases = [
      'Search Website e.g. "Dancing Cats"',
      "Lorem ipsum dolor sit amet",
      "Consectetur adipiscing elit",
      "JS is so strange :)",
    ];

    printPhrases(phrases, $("#search")).then(run);
  }

  run();
});
