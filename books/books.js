{/* <div class="book">
<figure class="book__img--wrapper">
<img class="book__img" src="assets/atomic-habits.jpg" alt="">
</figure>
<div class="book__title">
Atomic Habits
</div>
<div class="book__ratings">
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
<i class="fas fa-star-half-alt"></i>
</div>
<div class="book__price">
<span class="book__price--normal">$59.95</span> $14.95
</div>
</div> */}

/* 

Testing if this will come up in the file */

function openMenu() {
    document.body.classList += " menu--open";
}
function closeMenu(){
    document.body.classList.remove('menu--open');
}

// converted to async function then added the await for the function we want and it will call the function and load all the books in 1 sec

let books;

async function renderBooks(filter) {
    // created a const for .book div in HTML & getBooks()
    const booksWrapper = document.querySelector('.books');
    // added the loading section in the books html and show the loading icon then remove it after the books load
    booksWrapper.classList += ' books__loading'
    // if there's no books we want to apply the loading page then load the books but if there's the books no need to wait which is why the 'books' variable needs to be a general variable outside the function.
    if (!books) {        
        books = await getBooks();
    }
    booksWrapper.classList.remove('books__loading');
 
  
    // Using if statement the options are sorted based on "LOW_TO_HIGH" if the original price is low to high
    // "HIGH_TO_LOW" if the original price is high to low
    //"RATING" if the rating is from 5 stars down to 1 star and created a function that will increment the stars in the HTML see ratingsHTML() below
    if (filter === "LOW_TO_HIGH") {
        books.sort((a, b) => (a.originalPrice || a.salePrice) - (b.salePrice || b.originalPrice));

    }
    else if (filter === 'HIGH_TO_LOW') {
        books.sort((a, b) => (b.salePrice || b.originalPrice) - ( a.salePrice ||a.originalPrice));
    }
    else if (filter === 'RATING') {
        books.sort((a, b) => b.rating - a.rating);
    }


    // created a map() for the const books below then return it as a new array and added it inside the booksWrapper as a html code and created a new "BOOK" with the pictures, title, price etc
    // Then, target the url, title, prices to push it inside the array to create the new "BOOK" amd used the join() to combine all the array
    const booksHTML = books.map(book => {
        return `<div class="book">
            <figure class="book__img--wrapper">
                <img class="book__img" src="${book.url}" alt="">
            </figure>
            <div class="book__title">
               ${book.title}
            </div>
            <div class="book__ratings">
                ${ratingsHTML(book.rating)}
            </div>
            <div class="book__price">
            ${priceHTML(book.originalPrice, book.salePrice)}
          
            </div>
        </div>`;
    }).join('');

    // We add the booksHTML inside the booksWrapper to appear in our site
    booksWrapper.innerHTML = booksHTML;
}

// toFixed(2) will return a decimal point example 2 = 1.00
// created the 
function priceHTML(originalPrice, salePrice) {
    if (!salePrice){
     return `$${originalPrice.toFixed(2)}`;
    } 
    return `<span class="book__price--normal">$${originalPrice.toFixed(2)}</span>
     $${salePrice.toFixed(2)}`;
}



// created ratingsHTML() that returns rating then create a variable ratingHTML for the for loop and used Math.floor() to round off the rating into a whole number
/*It iterates the rating and the function was used in  
<div class="book__ratings">
    ${ratingsHTML(book.rating)}
</div> 
to use the rating from getBooks() which was used at the top in renderBooks()
*/

function ratingsHTML(rating) {
    let ratingHTML = '';

    for (let i = 0; i < Math.floor(rating); i++) {
        ratingHTML += '<i class="fas fa-star"></i>\n'
    }
    if (!Number.isInteger(rating)) {
        ratingHTML += '<i class="fas fa-star-half-alt"></i>\n'
    }
    return ratingHTML;
}



function filterBooks(event) {
    renderBooks(event.target.value);
    // if we console.log(event) we can see the other js method to use & the value which indicates the options we put in such as LOW_TO_HIGH, HIGH_TO_LOW & RATING
    //check to target the options in sorting the books
    // if (event.target.value === 'LOW_TO_HIGH') {
    //     console.log('low to high')

}




//push everything after it loads 
setTimeout(() => {
    renderBooks();
});


// FAKE DATA
function getBooks() {
   return new Promise ((resolve) => {
        setTimeout(()=> {
            resolve([
                {
                    id: 1,
                    title: "Crack the Coding Interview",
                    url: "assets/crack_the-code.png",
                    originalPrice: 49.95,
                    salePrice: 14.95,
                    rating: 4.5,
                },
                {
                    id: 2,
                    title: "Atomic Habits",
                    url: "assets/atomic-habits.jpg",
                    originalPrice: 39,
                    salePrice: null,
                    rating: 5,
                },
                {
                    id: 3,
                    title: "Deep Work",
                    url: "assets/deep_work.jpeg",
                    originalPrice: 29,
                    salePrice: 12,
                    rating: 5,
                },
                {
                    id: 4,
                    title: "The 10X Rule",
                    url: "assets/book-1.jpeg",
                    originalPrice: 44,
                    salePrice: 19,
                    rating: 4.5,
                },
                {
                    id: 5,
                    title: "Be Obsessed Or Be Average",
                    url: "assets/book-2.jpeg",
                    originalPrice: 32,
                    salePrice: 17,
                    rating: 4,
                },
                {
                    id: 6,
                    title: "Rich Dad Poor Dad",
                    url: "assets/book-3.jpeg",
                    originalPrice: 70,
                    salePrice: 12.5,
                    rating: 5,
                },
                {
                    id: 7,
                    title: "Cashflow Quadrant",
                    url: "assets/book-4.jpeg",
                    originalPrice: 11,
                    salePrice: 10,
                    rating: 4,
                },
                {
                    id: 8,
                    title: "48 Laws of Power",
                    url: "assets/book-5.jpeg",
                    originalPrice: 38,
                    salePrice: 17.95,
                    rating: 4.5,
                },
                {
                    id: 9,
                    title: "The 5 Second Rule",
                    url: "assets/book-6.jpeg",
                    originalPrice: 35,
                    salePrice: null,
                    rating: 4,
                },
                {
                    id: 10,
                    title: "Your Next Five Moves",
                    url: "assets/book-7.jpg",
                    originalPrice: 40,
                    salePrice: null,
                    rating: 4,
                },
                {
                    id: 11,
                    title: "Mastery",
                    url: "assets/book-8.jpeg",
                    originalPrice: 30,
                    salePrice: null,
                    rating: 4.5,
                },
            ]);
        }, 1000);
    });

}