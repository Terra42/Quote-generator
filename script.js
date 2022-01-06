const quoteContainerElm = document.getElementById('quote-container');
const quoteTextElm = document.getElementById('quote');
const authorElm = document.getElementById('author');
const twitterBtnElm = document.getElementById('twitter');
const newQuoteBtnElm = document.getElementById('new-quote');
const loaderElm = document.getElementById('loader');

let apiQuotes = [];

function showLoadingSpinner() {
  loaderElm.hidden = false;
  quoteContainerElm.hidden = true;
}

function hideLoadingSpinner() {
  quoteContainerElm.hidden = false;
  loaderElm.hidden = true;
}

function getNewQuote() {
  showLoadingSpinner();
  let quote = '';
  if (apiQuotes.length !== 0) {
    quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  } else {
    quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
  }
  setQuoteText(quote);
  hideLoadingSpinner();
}

function setQuoteText(quote) {
  if (!quote.author) {
    authorElm.textContent = 'Unknown';
  } else {
    authorElm.textContent = quote.author;
  }

  if (quote.text.length > 120) {
    quoteTextElm.classList.add('long-quote');
  } else {
    quoteTextElm.classList.remove('long-quote');
  }
  quoteTextElm.textContent = quote.text;
}

async function getQuotes() {
  showLoadingSpinner();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    getNewQuote();
  } catch (error) {
    console.log(error);
    getNewQuote();
  }
}

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteTextElm.textContent} - ${authorElm.textContent}`;
  window.open(twitterUrl, '_blank');
}

twitterBtnElm.addEventListener('click', tweetQuote);
newQuoteBtnElm.addEventListener('click', getNewQuote);

// On load
getQuotes();
