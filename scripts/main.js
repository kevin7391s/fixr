const conversation = document.getElementById("conversation");
const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");

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

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const message = input.value;
  input.value = "";

  appendMessage("user", message);

  setTimeout(() => {
    appendMessage("fixr", "I see.  Tell me more.");
  }, 1000);
});

const submitButton = document.getElementById("button-input");

submitButton.addEventListener("click", function () {
  conversation.scrollTop = conversation.scrollHeight;
});
