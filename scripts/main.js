const conversation = document.getElementById("conversation");
const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");

let fixr_response = false;

function appendMessage(sender, message) {
  const messageElem = document.createElement("div");
  messageElem.innerHTML = message;

  if (sender === "user") {
    messageElem.classList.add("user-response");
  } else if (sender === "fixr") {
    messageElem.classList.add("fixr-response");
  }
  conversation.scrollTop = conversation.scrollHeight;

  conversation.appendChild(messageElem);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  conversation.scrollTop = conversation.scrollHeight;

  const message = input.value;
  input.value = "";

  appendMessage("user", message);

  setTimeout(() => {
    appendMessage("fixr", "I see.  Tell me more.");
    conversation.scrollTop = conversation.scrollHeight;
  }, 1000);
});

const submitButton = document.getElementById("button-input");

/*
submitButton.addEventListener(fixr_response, function () {
  conversation.scrollTop = conversation.scrollHeight;
});
*/
