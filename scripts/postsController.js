

let itemsControllerInstance;
// Create 'ItemsController' class
class ItemsController {
  constructor(currentId = 0) {
    this.items = [];
    this.currentId = currentId;
    this.loadItemsFromLocalStorage();
  }

  addPost(postData) {
    this.addItem(postData.name, postData.description, postData.imageUrl);
  }
  // Create the addItem method
  addItem(name, description, imageUrl) {
    const item = {
      id: this.currentId++,
      name: name,
      description: description,
      imageUrl: imageUrl,
    };

    // Push item to 'items' property
    this.items.push(item);
    this.saveItemsToLocalStorage();
    this.save(name, description, imageUrl);
    // Call save function AFTER storing item in local storage
  }

  // Save items / posts from LocalStorage
  saveItemsToLocalStorage() {
    localStorage.setItem("items", JSON.stringify(this.items));
  }

  // Retrieve items / posts from LocalStorage
  loadItemsFromLocalStorage() {
    const storageItems = localStorage.getItem("items");
    if (storageItems) {
      const items = JSON.parse(storageItems);
      for (let i = 0, size = items.length; i < size; i++) {
        const item = items[i];
        this.items.push(item);
        // CurrentId updated to most recent id retrieved from storageItems
        if (item.id >= this.currentId) {
          this.currentId = item.id + 1;
        }
      }
    }
  }

  getPostsData() {
    return this.items;
  }

  save(name, description, imageUrl) {
    const data = { name, description, imageUrl };

    fetch("http://localhost:8080/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}
const itemsController = new ItemsController();

function displayPosts() {
  const posts = itemsController.getPostsData();
  const postsContainer = document.getElementById("dynamic-posts");
  const row = postsContainer.querySelector(".row");

  posts.forEach((post) => {
    const col = document.createElement("div");
    col.classList.add("col-md-6", "mx-auto");

    const card = document.createElement("div");
    card.classList.add("card", "text-center");

    const img = document.createElement("img");
    if (post.imageUrl) {
      img.src = post.imageUrl;
    } else {
      img.src = "./resources/images/sf-logo.png"; // Set default img if imageUrl is undefined
    }
    img.classList.add("card-img-top");
    img.alt = "image";

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const title = document.createElement("h5");
    title.classList.add("card-title");
    title.textContent = post.name;

    const text = document.createElement("p");
    text.classList.add("card-text");
    text.textContent = post.description;

    const readMoreBtn = document.createElement("a");
    readMoreBtn.href = "#";
    readMoreBtn.classList.add("btn", "btn-secondary");
    readMoreBtn.textContent = "Read More";

    const addBtn = document.createElement("a");
    addBtn.href = "#";
    addBtn.classList.add("btn", "btn-outline-light");
    addBtn.textContent = "Add";

    cardBody.appendChild(title);
    cardBody.appendChild(text);
    cardBody.appendChild(readMoreBtn);
    cardBody.appendChild(addBtn);

    card.appendChild(img);
    card.appendChild(cardBody);

    col.appendChild(card);

    row.appendChild(col);
  });
}

window.addEventListener("load", () => {
  // Check if 'dynamic-posts' element is present on page
  if (document.getElementById("dynamic-posts")) {
    displayPosts();
  }
});

export default ItemsController;