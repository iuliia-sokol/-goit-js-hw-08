// Add imports above this line
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { galleryItems } from "./gallery-items";
// Change code below this line

const galleryEl = document.querySelector(".gallery");

const galleryMarkUp = createGallery(galleryItems);

galleryEl.insertAdjacentHTML("beforeend", galleryMarkUp);

function createGallery(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
              <a class="gallery__item"  href="${original}">
            <img class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}" />
      </a>
      `;
    })
    .join("");
}

let lightbox = new SimpleLightbox(".gallery a", {
  captions: true,
  captionPosition: "bottom",
  captionSelector: "img",
  captionType: "attr",
  captionsData: "alt",
  captionDelay: 250,
});

// console.log(galleryItems);
