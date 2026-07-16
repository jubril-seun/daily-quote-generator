/* PSEUDOCODE
An array of pre-written quotes and author will be written
When the user clicks the "New quote" button, a quote will be randomly selected, along with the author.
The same quote should not be selected twice in a row
A counter will update on the bottom to show how many quotes have been viewed
A copy button will allow the user to copy the current quote and author
A temporary copy animation will show after the user copy's the quote
*/

const newQuoteBtn = document.getElementById("new-quote-btn");
const quoteBody = document.getElementById("quote-body");
const quoteAuthor = document.getElementById("author-name");
const quoteTally = document.getElementById("quote-tally");
const copyBtn = document.getElementById("copy-btn");
const copyTextEl = document.getElementById("copy-text")
const copyIcon = document.querySelector(".copy-icon")

const quotes = [
    {author: "Steve Jobs", quote: "The only way to do great work is to love what you do."},
    {author: "Eleanor Roosevelt", quote: "The future belongs to those who believe in the beauty of their dreams."},
    {author: "Winston Churchill", quote: "Success is not final, failure is not fatal: it is the courage to continue that counts."},
    {author: "Henry Ford", quote: "Whether you think you can, or you think you can't—you're right."},
    {author: "Nelson Mandela", quote: "It always seems impossible until it's done."},
];


function shuffle (arr) {
    let quote = Math.floor(Math.random() * Number(arr.length));
    
    return arr[quote];
}

function firstQuote () {
   let quote = shuffle(quotes);

    quoteBody.textContent = quote.quote;
    quoteAuthor.textContent = quote.author;
    quoteTally.textContent = "Quote 1 of this session";

    return quote;
}


let userQuotes = [firstQuote()];


// console.log(shuffle(quotes));

function noDuplicates(arr) {
   
    let genQuote = shuffle(arr);

    if(genQuote !== userQuotes[userQuotes.length - 1]){
        userQuotes.push(genQuote);
        return genQuote;
    } else 
        return noDuplicates(arr);
 
}


function copyText(){
    const bodyText = `${quoteBody.textContent}
    \n —  ${quoteAuthor.textContent}`;

    navigator.clipboard.writeText(bodyText)
        .then(() => {
            copyTextEl.textContent = "Copied!";
            copyIcon.classList.toggle("disable");
            copyBtn.classList.toggle("btn-pointer-disabled");


            setTimeout(() => {
                copyTextEl.textContent = "Copy";
                copyIcon.classList.toggle("disable");
                copyBtn.classList.toggle("btn-pointer-disabled");
            }, 1500)
        })
}


newQuoteBtn.addEventListener("click", () => {
    let userShuffle = noDuplicates(quotes);

    quoteBody.classList.add("fade-out");
    quoteAuthor.classList.add("fade-out");
    newQuoteBtn.classList.toggle("btn-disabled");
    copyBtn.classList.toggle("btn-pointer-disabled");

    setTimeout(() =>{
        quoteBody.textContent = userShuffle.quote;
        quoteAuthor.textContent = userShuffle.author;
        quoteBody.classList.remove("fade-out");
        quoteAuthor.classList.remove("fade-out");
        copyBtn.classList.toggle("btn-pointer-disabled");
        newQuoteBtn.classList.toggle("btn-disabled");
        quoteTally.textContent = `Quote ${userQuotes.length} of this session`;
    }, 500)
})

copyBtn.addEventListener("click", () => {
    copyText();
})

