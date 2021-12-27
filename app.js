const card = document.getElementById("quote");
const quoteText = document.getElementById("quote__text");
const quoteTeller = document.getElementById("quote__teller");
const TwitterShareButton = document.getElementById("t-button");
const newQuoteButton = document.getElementById("cta-button");
const spinner = document.getElementById("spinner");
const API_URL = "http://api.quotable.io/random";

const getQuote = async () => {
  loading();
  try {
    const response = await fetch(API_URL);
    const quote = await response.json();
    quoteText.textContent = quote.content;
    quoteTeller.textContent = quote.author;
    if (quote.length > 90) {
      quoteText.classList.add("long-text");
    } else {
      quoteText.classList.remove("long-text");
    }
  } catch {
    Toastify({
      text: "Couldn't fetch new Quote",
      duration: 6000,
      position: "center",
      style: {
        background: "crimson",
        fontFamily: "sans-serif",
        fontSize: "1.4rem",
      },
    }).showToast();
  } finally {
    complete();
  }
};

const tweetQuote = () => {
  const tweetURL = `https://twitter.com/intent/tweet?text="${quoteText.textContent}" - ${quoteTeller.textContent}`;
  window.open(tweetURL, "_blank");
};

const loading = () => {
  spinner.hidden = false;
  card.hidden = true;
};

const complete = () => {
  spinner.hidden = true;
  card.hidden = false;
};

getQuote();
newQuoteButton.addEventListener("click", getQuote);
TwitterShareButton.addEventListener("click", tweetQuote);
window.addEventListener("offline", () => {
  Toastify({
    text: "going offline!",
    duration: 6000,
    position: "center",
    style: {
      background: "crimson",
      fontFamily: "sans-serif",
      fontSize: "1.4rem",
    },
  }).showToast();
  newQuoteButton.setAttribute("disabled", "true");
});
window.addEventListener("online", () => {
  Toastify({
    text: "Connection restored!",
    duration: 6000,
    position: "center",
    style: {
      background: "#1e7",
      fontFamily: "sans-serif",
      fontSize: "1.4rem",
    },
  }).showToast();
  if (quoteText.textContent.length === 1) getQuote();
  newQuoteButton.removeAttribute("disabled");
});
