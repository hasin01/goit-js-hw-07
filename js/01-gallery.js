import { galleryItems } from "./gallery-items.js";
console.log(galleryItems);
const galleryEl = document.querySelector(".gallery");
console.log(galleryEl);
const makeGalleryItem = ({ preview, original, description } = {}) => {
  return `
    <li class='gallery__item'>
        <a class='gallery__link' href='${original}'>
         <img src='${preview}' alt='${description}' data-source='${original}' class='gallery__image'> 
        </a>
    </li>`;
};
const galleryPhotosArr = galleryItems
  .map((photo) => {
    return makeGalleryItem(photo);
  })
  .join("");

galleryEl.insertAdjacentHTML("beforeend", galleryPhotosArr);

galleryEl.addEventListener("click", onImageClick);

function onImageClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  const modalEl = basicLightbox.create(
    `
        <img src='${event.target.dataset.source}' width='1280' height='855'>`,
    {
      onShow: () => {
        document.addEventListener("keydown", onEscapeClose);
      },
      onClose: () => {
        document.removeEventListener("keydown", onEscapeClose);
      },
    }
  );
  const onEscapeClose = (event) => {
    if (event.code === "Escape") {
      modalEl.close();
    }
  };
  modalEl.show();
}
