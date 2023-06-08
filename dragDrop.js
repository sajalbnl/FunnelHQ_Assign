var successMessage = document.getElementById("successMessage");
var originalDragContainer = document
  .querySelector(".drag-container")
  .cloneNode(true);

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.innerHTML);
  event.dataTransfer.effectAllowed = "move";
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  var targetContainer = event.target.closest(".container");
  if (targetContainer.classList.contains("drag-container")) {
    event.target.appendChild(document.createElement("div"));
    return;
  }
  var item = document.createElement("div");
  item.classList.add("item");
  var img = document.createElement("img");
  img.src = data;
  img.alt = "Dropped Item";
  item.appendChild(img);
  event.target.appendChild(item);
  successMessage.textContent = "Item dropped successfully!";
  event.target.querySelector("h2").style.display = "none";
  removeItemFromDragContainer(data);

  // Remove item from container 1
  var dragContainer = document.querySelector(".drag-container");
  var items = dragContainer.querySelectorAll(".item");
  for (var i = 0; i < items.length; i++) {
    if (items[i].querySelector("img").src === data) {
      dragContainer.removeChild(items[i]);
      break;
    }
  }
}

function removeItemFromDragContainer(itemText) {
  var dragContainer = document.querySelector(".drag-container");
  var items = dragContainer.querySelectorAll(".item");
  for (var i = 0; i < items.length; i++) {
    if (items[i].innerHTML === itemText) {
      dragContainer.removeChild(items[i]);
      break;
    }
  }
}
//fetching random images

function getRandomImage() {
  return fetch(
    "https://api.unsplash.com/photos/random?client_id=7XoByHMm07GCWm1cur69kQIVnkIgFRHv6lmWXAHJQ-U"
  )
    .then((response) => response.json())
    .then((data) => data.urls.small)
    .catch((error) => console.log(error));
}

async function setRandomImages() {
  var dragContainer = document.querySelector(".drag-container");
  var items = dragContainer.querySelectorAll(".item");
  for (var i = 0; i < items.length; i++) {
    var img = items[i].querySelector("img");
    var imageUrl = await getRandomImage();
    img.src = imageUrl;
  }
}
//to reset
function resetContainers() {
  var dragContainer = document.querySelector(".drag-container");
  var dropContainer = document.querySelector(".drop-container");
  dropContainer.innerHTML = "<h2>Drop items here</h2>";
  dropContainer.querySelector("h2").style.display = "block";
  successMessage.textContent = "";
  dragContainer.replaceWith(originalDragContainer.cloneNode(true));
  setRandomImages();
}

setRandomImages();
