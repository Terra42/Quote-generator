const quoteContainerElm = document.getElementById('quote-container');
const quoteTextElm = document.getElementById('quote');
const authorElm = document.getElementById('author');
const twitterBtnElm = document.getElementById('twitter');
const newQuoteBtnElm = document.getElementById('new-quote');
const loaderElm = document.getElementById('loader');

let apiQuotes = [];

// Show loading
function loading() {
  loaderElm.hidden = false;
  quoteContainerElm.hidden = true;
}

// Hide loading
function complete() {
  quoteContainerElm.hidden = false;
  loaderElm.hidden = true;
}

// Show new quote
function newQuote() {
  loading();
  let quote = '';
  if (apiQuotes.length !== 0) {
    quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  } else {
    quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
  }
  setQuoteText(quote);
  complete();
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

// Get quotes from API
async function getQuotes() {
  loading();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    console.log(error);
    newQuote();
  }
}

//Tweet quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteTextElm.textContent} - ${authorElm.textContent}`;
  window.open(twitterUrl, '_blank');
}

twitterBtnElm.addEventListener('click', tweetQuote);
newQuoteBtnElm.addEventListener('click', newQuote);

// On load
getQuotes();
