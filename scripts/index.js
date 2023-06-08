import ItemsController from "./postsController.js";

const itemsController = new ItemsController();

document.addEventListener("DOMContentLoaded", function () {
  const addButtons = document.querySelectorAll(".btn-outline-light");

  addButtons.forEach((button) => {
    button.addEventListener("click", handleButtonClick);
  });

  function handleButtonClick(event) {
    const button = event.target;
    event.preventDefault();
    const action = button.textContent;

    if (action === "Add") {
      // Redirect to post_form.html for adding new post
      window.location.href = "post_form.html";
    } else if (action === "Edit") {
      // Save post data to LocalStorage for editing
      const postName = button.parentElement.querySelector(".card-title").textContent;
      const postDescription = button.parentElement.querySelector(".card-text").textContent;
      const postImageUrl = button.parentElement.parentElement.querySelector(".card-img-top").src;
      const postData = {
        name: postName,
        description: postDescription,
        imageUrl: postImageUrl,
      };

      localStorage.setItem("editPostData", JSON.stringify(postData));
      window.location.href = "post_form.html?edit=true";
    }
  }


  function addPost(name, description, imageUrl, edit = false) {
    // Your existing addPost function content
    itemsController.addPost(name, description, imageUrl);
  }

  // Remove the duplicate handleButtonClick function
});