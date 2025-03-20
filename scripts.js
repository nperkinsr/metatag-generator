function generateMetaTags() {
  const fields = [
    { id: "title", meta: `<meta name="title" content="` },
    { id: "description", meta: `<meta name="description" content="` },
    { id: "keywords", meta: `<meta name="keywords" content="` },
    { id: "favicon", meta: `<link rel="icon" href="` },
    { id: "ogTitle", meta: `<meta property="og:title" content="` },
    { id: "ogDescription", meta: `<meta property="og:description" content="` },
    { id: "ogImage", meta: `<meta property="og:image" content="` },
    { id: "ogUrl", meta: `<meta property="og:url" content="` },
    { id: "ogType", meta: `<meta property="og:type" content="` },
    { id: "ogSiteName", meta: `<meta property="og:site_name" content="` },
  ];

  let metaTags = "";

  fields.forEach(({ id, meta }) => {
    const input = document.getElementById(id);
    if (
      input &&
      input.value.trim() !== "" &&
      input.value !== input.placeholder
    ) {
      // Only generate meta tags for fields that are filled in by the user
      metaTags += `${meta}${input.value}">\n`;
    }
  });

  const metaTagsContainer = document.getElementById("metaTags");
  if (metaTagsContainer) {
    metaTagsContainer.textContent = metaTags.trim(); // Display only the generated meta tags
  }

  updatePreviews();
}

function updatePreviews() {
  const fields = [
    { id: "title", previewId: "googlePreviewTitle" },
    { id: "description", previewId: "googlePreviewDescription" },
    { id: "ogTitle", previewId: "socialPreviewTitle" },
    { id: "ogDescription", previewId: "socialPreviewDescription" },
    { id: "ogSiteName", previewId: "socialPreviewSiteName" },
  ];

  fields.forEach(({ id, previewId }) => {
    const input = document.getElementById(id);
    const previewElement = document.getElementById(previewId);
    if (input && previewElement) {
      // Use the input value if filled, otherwise use the placeholder
      previewElement.textContent =
        input.value.trim() !== "" ? input.value : input.placeholder;
    }
  });

  // Update favicon preview
  const faviconInput = document.getElementById("favicon");
  const faviconPlaceholder = document.querySelector(".favicon-placeholder");
  if (faviconPlaceholder) {
    faviconPlaceholder.style.backgroundImage = `url(${
      faviconInput.value.trim() !== "" ? faviconInput.value : "assets/donut.png"
    })`;
  }

  // Update OG image preview
  const ogImageInput = document.getElementById("ogImage");
  const ogImagePlaceholder = document.querySelector("#socialPreviewImage");
  if (ogImagePlaceholder) {
    ogImagePlaceholder.src =
      ogImageInput.value.trim() !== ""
        ? ogImageInput.value
        : "assets/muffin.jpg";
  }

  // Update OG URL preview
  const ogUrlInput = document.getElementById("ogUrl");
  const ogUrlPreview = document.getElementById("ogUrlPreview");
  if (ogUrlPreview) {
    ogUrlPreview.textContent =
      ogUrlInput.value.trim() !== ""
        ? ogUrlInput.value
        : ogUrlInput.placeholder;
  }

  // Update site name and site URL in Google preview
  const ogSiteNameInput = document.getElementById("ogSiteName");
  const siteNameElement = document.querySelector(".site-name");
  if (siteNameElement) {
    siteNameElement.textContent =
      ogSiteNameInput.value.trim() !== ""
        ? ogSiteNameInput.value
        : ogSiteNameInput.placeholder;
  }

  const siteUrlElement = document.querySelector(".site-url");
  if (siteUrlElement) {
    siteUrlElement.textContent =
      ogUrlInput.value.trim() !== ""
        ? ogUrlInput.value
        : ogUrlInput.placeholder;
  }
}

function handlePlaceholder(input) {
  input.addEventListener("focus", function () {
    if (this.value === this.placeholder) {
      this.value = "";
    }
  });

  input.addEventListener("blur", function () {
    if (this.value.trim() === "") {
      this.value = this.placeholder;
    }
    updatePreviews(); // Update previews when the user leaves the field
  });
}

function updateFieldBackgrounds() {
  const inputs = document.querySelectorAll("input");

  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      // Check if the field has custom content
      if (this.value.trim() === "" || this.value === this.placeholder) {
        this.classList.remove("modified");
        this.classList.add("unmodified");
      } else {
        this.classList.remove("unmodified");
        this.classList.add("modified");
      }
    });

    // Initialize the background color on load
    if (input.value.trim() === "" || input.value === input.placeholder) {
      input.classList.add("unmodified");
    } else {
      input.classList.add("modified");
    }
  });
}

// Call the function on page load
window.onload = function () {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.value = ""; // Clear all input fields on load
    handlePlaceholder(input);
  });

  updateFieldBackgrounds();
  updatePreviews(); // Initialize previews with placeholders
};
