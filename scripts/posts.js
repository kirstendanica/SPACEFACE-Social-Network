/* Re: previous error...
Allow DOM to load fully before this script runs */

import ItemsController from "./postsController.js";

document.addEventListener('DOMContentLoaded', async () => {
  const itemsController = new ItemsController();

  // Define function 'addItemCard(item)' using elements from posts.html
  function addItemCard(item) {
    const listItems = document.getElementById('list-items');
    const col = document.createElement('div');
    col.className = 'col-md-6 mx-auto';

    const card = `
        <div class="card text-center">
            <img src="${item.img}" class="card-img-top" alt="image">
            <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">${item.description}</p>
                <a href="#" class="btn btn-secondary">Read More</a>
                <a href="#" class="btn btn-outline-light">Add</a>
                </div>
            </div>
        </div>
        <br />
    `;

    col.innerHTML = card;
    listItems.appendChild(col);
  }

  // Save and get items / posts from the LocalStorage
  const sampleItems = [
    // ... (unchanged code) ...
  ];
  localStorage.setItem("items", JSON.stringify(sampleItems));

  // Retrieve items from LocalStorage and display them in 'posts.html' via 'addItemCard(item)' function
  itemsController.loadItemsFromLocalStorage();
  itemsController.items.forEach(item => {
    addItemCard(item);
  });
});