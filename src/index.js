import "./sass/index.scss";

document.addEventListener("DOMContentLoaded", () => {

  const imagesContainerEl = document.querySelector(".slider__images-container");
  const img1El = document.querySelector(".slider__image-container--first img");
  const img2El = document.querySelector(".slider__image-container--second img");
  let dragging = false;
  
  const img1ContainerEl = document.querySelector(
    ".slider__image-container--first"
  );
  const img2ContainerEl = document.querySelector(
    ".slider__image-container--second"
  );
  let imagesContainerWitdh;
  let imagesContainerLetfOffset;
  const handleEl = document.querySelector(".slider__handle");
  const dividerEl = document.querySelector(".slider__divider");

  function getOffset(clientX) {
    const offset = clientX - imagesContainerLetfOffset;
    if (offset < 0) {
      return 0;
    } else if (offset > imagesContainerWitdh) {
      return imagesContainerWitdh;
    } else {
      return offset;
    }
  };

  function move(clientX) {
    const offset = getOffset(clientX);
    const percent = offset / imagesContainerWitdh * 100;
    dividerEl.style.left = `${percent}%`;
    img2ContainerEl.style.width = `${percent}%`;
  };
  function initEvents() {
    handleEl.addEventListener("mousedown", () => {
      dragging = true;
    });
    handleEl.addEventListener("mouseup", () => {
      dragging = false;
    });
    window.addEventListener("mousemove", (event) => {
      if (dragging) {
        move(event.clientX);
      }
    });
  };

  function adjustImagesSize() {
    imagesContainerWitdh = imagesContainerEl.offsetWidth;
    imagesContainerLeftOffset = imagesContainerEl.offsetLeft;
    img1El.style.width = imagesContainerWitdh + "px";
    img2El.style.width = imagesContainerWitdh + "px";
  };

  window.addEventListener("resize", () => {
    adjustImagesSize();
    initEvents();
  });
});
