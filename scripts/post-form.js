export default class PostFormController {
  constructor(itemsController) {
    this.itemsController = itemsController;
    this.init();
  }

  init() {
    document.addEventListener("DOMContentLoaded", () => {
      const form = document.getElementById("addItemForm");

      if (form) {
        form.addEventListener("submit", (event) => {
          event.preventDefault();
          this.submitFormAndRedirect();
        });

        const urlParams = new URLSearchParams(window.location.search);
        this.isEditMode = urlParams.get("edit") === "true";

        if (this.isEditMode) {
          this.loadPostDataForEdit();
        }

      } else {
        console.error("Form not found");
      }
    });
  }

  submitFormAndRedirect() {
    const name = document.getElementById("newItemName").value;
    const description = document.getElementById("newItemDescription").value;
    const imageUrl = document.getElementById("newItemImageUrl").value;

    const actionPromise = this.isEditMode
      ? this.update(itemId, { name, description, imageUrl })
      : this.save(name, description, imageUrl);

    actionPromise
      .then(() => {
        console.log("Action successful!");
        window.location.href = "posts.html";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  loadPostDataForEdit() {
    const editPostData = localStorage.getItem("editPostData");
    if (editPostData) {
      const { name, description, imageUrl } = JSON.parse(editPostData);
      document.getElementById("newItemName").value = name;
      document.getElementById("newItemDescription").value = description;
      document.getElementById("newItemImageUrl").value = imageUrl;
    }

    const formReadyEvent = new CustomEvent("formReady");
    document.dispatchEvent(formReadyEvent);
  }

  save(name, description, imageUrl) {
    return this.itemsController.save(name, description, imageUrl);
  }

  update(itemId, itemData) {
    return this.itemsController.update(itemId, itemData);
  }

  findByItemId(itemId) {
    return this.itemsController.findByItemId(itemId);
  }

  delete(itemId) {
    return this.itemsController.delete(itemId);
  }
}