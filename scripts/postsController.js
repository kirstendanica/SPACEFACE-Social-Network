class ItemsController {
  constructor() {
    this.items = [];
    this.loadItemsFromBackend();
  }

  loadItemsFromLocalStorage() {
    const postsFromStorage = localStorage.getItem("posts");
    if (postsFromStorage) {
      this.posts = JSON.parse(postsFromStorage);
    }
  }

  async loadItemsFromBackend() {
    try {
      const response = await fetch("http://localhost:8080/post");
      const posts = await response.json();
      this.items = posts;
      displayPosts();
    } catch (error) {
      console.error("Error loading items:", error);
    }
  }

  addPost(postData) {
    this.addItem(postData.name, postData.description, postData.imageUrl);
  }

  async addItem(name, description, imageUrl) {
    const item = {
      title: name,
      content: description,
      imageUrl: imageUrl,
    };

    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("http://localhost:8080/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        });
        const createdPost = await response.json();
        this.items.push(createdPost);
        resolve();
      } catch (error) {
        console.error("Error adding item:", error);
        reject(error);
      }
    });
  }

  getPostsData() {
    return this.items;
  }
}

const itemsController = new ItemsController();

function displayPosts() {
  const posts = itemsController.getPostsData();
  const postsContainer = document.getElementById("dynamic-posts");
  const row = postsContainer.querySelector(".row");

  row.innerHTML = "";

  posts.forEach((post) => {
    const col = document.createElement("div");
    col.classList.add("col-md-6", "mx-auto");

    const card = document.createElement("div");
    card.classList.add("card", "text-center");

    const img = document.createElement("img");
    if (post.imageUrl) {
      img.src = post.imageUrl;
    } else {
      img.src = "./resources/images/sf-logo.png";
    }
    img.classList.add("card-img-top");
    img.alt = "image";

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const title = document.createElement("h5");
    title.classList.add("card-title");
    title.textContent = post.title;

    const text = document.createElement("p");
    text.classList.add("card-text");
    text.textContent = post.content;

    const readMoreBtn = document.createElement("a");
    readMoreBtn.href = "#";
    readMoreBtn.classList.add("btn", "btn-secondary");
    readMoreBtn.textContent = "Read More";

    const addBtn = document.createElement("a");
    addBtn.href = "#";
    addBtn.classList.add("btn", "btn-outline-light");
    addBtn.textContent = "Add";
    addBtn.addEventListener("click", () => {
      window.location.href = "post_form.html";
    });

    readMoreBtn.addEventListener('click', (event) => {
      event.preventDefault();
    });

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

document.addEventListener("DOMContentLoaded", () => {
  const postForm = document.getElementById("post-form");
  if (postForm) {
    postForm.addEventListener("submit", submitPostForm);
  }
});

async function submitPostForm(event) {
  event.preventDefault();

  const name = document.getElementById("newItemName").value.trim();
  const description = document.getElementById("newItemDescription").value.trim();
  const imageUrl = document.getElementById("newItemImageUrl").value.trim();

  if (name && description) {
    await itemsController.addItem(name, description, imageUrl);
    window.location.href = "posts.html";
    await itemsController.loadItemsFromBackend(); // Reload the posts data from the backend
    displayPosts();
  } else {
    alert("Please enter a name and description for the post!");
  }
}

export default ItemsController;