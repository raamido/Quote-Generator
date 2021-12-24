const card = document.getElementById("quote");
const quoteText = document.getElementById("quote__text");
const quoteTeller = document.getElementById("quote__teller");
const TwitterShareButton = document.getElementById("t-button");
const newQuoteButton = document.getElementById("cta-button");

const getQuote = async () => {
  const API_URL = "http://api.quotable.io/random";
  const response = await fetch(API_URL);
  const quote = await response.json();
  try {
    quoteText.textContent = quote.content;
    quoteTeller.textContent = quote.author;
    quote.length > 90 ? quoteText.classList.toggle("long-text") : null;
  } catch (error) {
    console.error(error);
  }
};

const tweetQuote = () => {
  const tweetURL = `https://twitter.com/intent/tweet?text="${quoteText.textContent}" - ${quoteTeller.textContent}`;
  window.open(tweetURL, "_blank");
};

getQuote();
newQuoteButton.addEventListener("click", getQuote);
TwitterShareButton.addEventListener("click", tweetQuote);
