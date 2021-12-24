const card = document.getElementById("quote");
const quoteText = document.getElementById("quote__text");
const quoteTeller = document.getElementById("quote__teller");
const TwitterShareButton = document.getElementById("t-button");
const newQuoteButton = document.getElementById("cta-button");
const spinner = document.getElementById("spinner");

const getQuote = async () => {
  loading();
  const API_URL = "http://api.quotable.io/random";
  const response = await fetch(API_URL);
  const quote = await response.json();
  try {
    complete();
    quoteText.textContent = quote.content;
    quoteTeller.textContent = quote.author;
    if (quote.length > 90) {
      quoteText.classList.add("long-text");
    } else {
      quoteText.classList.remove("long-text");
    }
  } catch (error) {
    console.error(error);
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
