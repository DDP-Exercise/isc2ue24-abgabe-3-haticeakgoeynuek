"use strict";

/**
 * Selects a random full image at the start and displays it.
 */
function showRandomImageAtStart() {
    // Select all 6 links (<a>) in the thumbnail section. They contain the URLs to the full images.
    const thumbnailLinks = document.querySelectorAll('#thumbnails a');
    // Select a random entry out of these 6.
    const randomIndex = getRandomInt(0, thumbnailLinks.length);
    const randomLink = thumbnailLinks[randomIndex];
    const imageUrl = randomLink.getAttribute('href');
    const imageDescription = randomLink.querySelector('img').getAttribute('alt');
    // Implement switchFullImage() below.
    // Call switchFullImage() with the URL of the random image and the alt attribute of the thumbnail (it contains the description).
    switchFullImage(imageUrl, imageDescription);
    // Set a background color (classes .bg-dark and .text-white) to the card-body of your random image (hint: it's the sibling element of your link).
    const cardBody = randomLink.closest('.card').querySelector('.card-body');
    cardBody.classList.add('bg-dark', 'text-white');
}

/**
 * Prepare the links on the full images so that they execute the following tasks:
 * - Switch the full image to the one that has been clicked on.
 * - Set the highlight under the current thumbnail.
 * - Load the notes for the current image.
 */
function prepareLinks() {
    // Select all the 6 links (<a>) in the thumbnail section.
    const thumbnailLinks = document.querySelectorAll('#thumbnails a');
    // Set an event listener for the click event on every <a> element.
    thumbnailLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // default action wird prevented
            //The callback of the listener should do the following things:
            //  - Remove the .bg-dark and .text-white classes from the card where it's currently set.
            //  - Add both classes again to the card where the click happened (hint: "this" contains the very <a> element, where the click happened).
            //  - Call switchFullImage() with the URL clicked link and the alt attribute of the thumbnail.
            //  - Implement and then call loadNotes() with the key for the current image (hint: the full image's URL makes an easy and unique key).
            //  - Prevent the default action for the link (we don't want to follow it).
            const currentActiveCard = document.querySelector('.card-body.bg-dark.text-white');
            if (currentActiveCard) {
                currentActiveCard.classList.remove('bg-dark', 'text-white');
            }
            const clickedCard = this.closest('.card').querySelector('.card-body');
            clickedCard.classList.add('bg-dark', 'text-white');
            const imageUrl = this.getAttribute('href');
            const imageDescription = this.querySelector('img').getAttribute('alt');
            switchFullImage(imageUrl, imageDescription);
            const imageKey = getImageKey(imageUrl);
            loadNotes(imageKey);
        });
    });
}

/**
 * Stores or deletes the updated notes of an image after they have been changed.
 */
function storeNotes() {
    // Select the notes field and add a blur listener.
    const notesField = document.getElementById('notes');
    notesField.addEventListener('blur', function() {
        const notes = this.textContent.trim();
        const imageKey = getImageKey(document.querySelector('#fullImage img').getAttribute('src'));
        // When the notes field loses focus, store the notes for the current image in the local storage.
        if (notes !== '') {
            localStorage.setItem(imageKey, notes);
        } else {
            // If the notes field is empty, remove the local storage entry.
            // Choose an appropriate key (hint: the full image's URL makes an easy and unique key).
            localStorage.removeItem(imageKey);
        }
    });
}

/**
 * Switches the full image in the <figure> element to the one specified in the parameter. Also updates the image's alt
 * attribute and the figure's caption.
 * @param {string} imageUrl The URL to the new image (the image's src attribute value).
 * @param {string} imageDescription The image's description (used for the alt attribute and the figure's caption).
 */
function switchFullImage(imageUrl, imageDescription) {
    // Get the <img> element for the full image. Select it by its class or tag name.
    const fullImage = document.querySelector('#fullImage img');
    // Set its src and alt attributes with the values from the parameters (imageUrl, imageDescription).
    fullImage.setAttribute('src', imageUrl);
    fullImage.setAttribute('alt', imageDescription);
    // Select the <figcaption> element.
    const figcaption = document.querySelector('#fullImage figcaption');
    // Set the description (the one you used for the alt attribute) as its text content.
    figcaption.textContent = imageDescription;
}

/**
 * Loads the notes from local storage for a given key and sets the contents in the notes field with the ID notes.
 * @param {string} key The key in local storage where the entry is found.
 */
function loadNotes(key) {
    // Select the notes field.
    const notesField = document.getElementById('notes');
    // Check the local storage at the provided key.
    const notes = localStorage.getItem(key);
    //  - If there's an entry, set the notes field's HTML content to the local storage's content.
    if (notes !== null) {
        notesField.textContent = notes;
    } else {
        //  - If there's no entry, set the default text "Enter your notes here!".
        notesField.textContent = 'Enter your notes here!';
    }
}

/**
 * Returns a random integer value between min (included) and max (excluded).
 * @param {number} min The minimum value (included).
 * @param {number} max The maximum value (excluded).
 * @returns {number} A random integer value between min (included) and max (excluded).
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getImageKey(imageUrl) {
    return imageUrl.split('/').pop();
}
/**
 * Gets the whole thing started.
 */
showRandomImageAtStart();
prepareLinks();
storeNotes();
