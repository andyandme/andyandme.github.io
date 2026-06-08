document.addEventListener("DOMContentLoaded", () => {
  const galleryImages = document.querySelectorAll(".gallery img");

  if (!galleryImages.length) {
    return;
  }

  const lightbox = document.createElement("div");
  lightbox.className = "image-lightbox";
  lightbox.setAttribute("aria-hidden", "true");

  lightbox.innerHTML = `
    <div class="image-lightbox__inner" role="dialog" aria-modal="true" aria-label="Expanded gallery image">
      <button class="image-lightbox__close" type="button" aria-label="Close enlarged image">×</button>
      <img class="image-lightbox__image" src="" alt="">
      <p class="image-lightbox__caption"></p>
    </div>
  `;

  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector(".image-lightbox__image");
  const lightboxCaption = lightbox.querySelector(".image-lightbox__caption");
  const closeButton = lightbox.querySelector(".image-lightbox__close");

  function openLightbox(sourceImage) {
    lightboxImage.src = sourceImage.currentSrc || sourceImage.src;
    lightboxImage.alt = sourceImage.alt || "Expanded project screenshot";
    lightboxCaption.textContent = sourceImage.alt || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    closeButton.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    lightboxImage.src = "";
  }

  galleryImages.forEach((image) => {
    image.setAttribute("tabindex", "0");
    image.setAttribute("role", "button");
    image.setAttribute("title", "Click to enlarge");

    image.addEventListener("click", () => openLightbox(image));

    image.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(image);
      }
    });
  });

  closeButton.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
});
