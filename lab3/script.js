(function () {
  // Частина 1: вибір за першою літерою
  var names = ["Yaakov", "John", "Jen", "Jason", "Paul", "Frank",
               "Larry", "Paula", "Laura", "Jim"];

  console.log("=== Частина 1: вибір за першою літерою ===");
  console.log("Підхід: якщо ім'я починається з J/j — Goodbye, інакше — Hello");

  for (var i = 0; i < names.length; i++) {
    var firstLetter = names[i].charAt(0).toLowerCase();
    if (firstLetter === "j") {
      byeSpeaker.speak(names[i]);
    } else {
      helloSpeaker.speak(names[i]);
    }
  }

  // Частина 2: вибір за сумою ASCII-кодів
  var extraNames = ["Anna", "Bob", "Oleksandr", "Iryna", "Max", "Taras", "Kateryna"];
  var THRESHOLD = 500;

  function asciiSum(name) {
    var sum = 0;
    for (var k = 0; k < name.length; k++) {
      sum += name.charCodeAt(k);
    }
    return sum;
  }

  console.log("");
  console.log("=== Частина 2: вибір за сумою ASCII-кодів ===");
  console.log("Підхід: якщо сума ASCII-кодів літер імені > " + THRESHOLD +
              " — Goodbye, інакше — Hello");

  for (var j = 0; j < extraNames.length; j++) {
    var total = asciiSum(extraNames[j]);
    console.log(extraNames[j] + ": сума = " + total);
    if (total > THRESHOLD) {
      byeSpeaker.speak(extraNames[j]);
    } else {
      helloSpeaker.speak(extraNames[j]);
    }
  }
})();
