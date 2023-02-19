// store divs in variables
const conversation = document.getElementById("conversation");
const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");

// chat box, add text bubbles and text depending on chat sender
function appendMessage(sender, message) {
  const messageElem = document.createElement("div");
  messageElem.innerHTML = message;

  if (sender === "user") {
    messageElem.classList.add("user-response");
  } else if (sender === "fixr") {
    messageElem.classList.add("fixr-response");
  }
  conversation.appendChild(messageElem);
}

// on button submit, take the users response and store in in variable to call function with
form.addEventListener("submit", (event) => {
  event.preventDefault();

  //user input message
  const message = input.value;
  input.value = "";

  // call above function and display users message
  appendMessage("user", message);

  // wait and send fixrs message
  // second parameter is where real response needs to go
  setTimeout(() => {
    appendMessage("fixr", "I see.  Tell me more.");
  }, 1000);
});
