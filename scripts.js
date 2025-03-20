function generateMetaTags() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const keywords = document.getElementById("keywords").value;
  const faviconInput = document.getElementById("favicon").value;
  const ogTitle = document.getElementById("ogTitle").value;
  const ogDescription = document.getElementById("ogDescription").value;
  const ogImage = document.getElementById("ogImage").value;
  const ogUrl = document.getElementById("ogUrl").value;
  const ogType = document.getElementById("ogType").value;
  const ogSiteName = document.getElementById("ogSiteName").value;

  let domainName = ogUrl.replace(/^(https?:\/\/)?(www\.)?/, "").split("/")[0];

  document.getElementById("googlePreviewTitle").textContent = title;
  document.getElementById("googlePreviewDescription").textContent = description;
  document.querySelector(".site-name").textContent = ogSiteName;
  document.querySelector(".site-url").textContent = domainName;

  const faviconPlaceholder = document.querySelector(".favicon-placeholder");
  if (faviconPlaceholder) {
    faviconPlaceholder.style.backgroundImage = faviconInput
      ? `url(${faviconInput})`
      : "url(https://bit.ly/4kEFLWa)";
  }

  const ogImagePlaceholder = document.querySelector(".ogImage-placeholder");
  if (ogImagePlaceholder) {
    ogImagePlaceholder.style.backgroundImage = ogImage
      ? `url(${ogImage})`
      : "url(https://images.pexels.com/photos/3892468/pexels-photo-3892468.jpeg)";
  }

  document.getElementById("socialPreviewTitle").textContent = ogTitle;
  document.getElementById("socialPreviewDescription").textContent =
    ogDescription;
  document.getElementById("socialPreviewImage").src =
    ogImage ||
    "https://images.pexels.com/photos/3892468/pexels-photo-3892468.jpeg";
  document.getElementById("ogUrlPreview").textContent = domainName;

  const metaTags = `
<meta name="title" content="${title}">
<meta name="description" content="${description}">
<meta name="keywords" content="${keywords}">
<link rel="icon" href="${faviconInput || "https://example.com/favicon.ico"}">
<meta property="og:title" content="${ogTitle}">
<meta property="og:description" content="${ogDescription}">
<meta property="og:image" content="${
    ogImage ||
    "https://images.pexels.com/photos/3892468/pexels-photo-3892468.jpeg"
  }">
<meta property="og:url" content="${ogUrl}">
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="${ogSiteName}">
`.trim();

  const metaTagsContainer = document.getElementById("metaTags");
  if (metaTagsContainer) {
    metaTagsContainer.textContent = metaTags;
  }
}

function handlePlaceholder(input) {
  input.addEventListener("focus", function () {
    if (this.value === this.defaultValue) {
      this.value = "";
    }
  });

  input.addEventListener("blur", function () {
    if (this.value.trim() === "") {
      this.value = this.defaultValue;
    }
  });
}

window.onload = function () {
  const defaultValues = {
    title: "The Flour Pot - Freshly Baked Goodness",
    description:
      "Discover our delicious range of artisan breads, pastries, and cakes. Baked fresh daily at The Flour Pot.",
    keywords: "bakery, artisan bread, pastries, cakes, fresh bread",
    favicon: "https://bit.ly/4kEFLWa",
    ogTitle: "The Flour Pot - Freshly Baked Goodness",
    ogDescription:
      "Enjoy the finest artisan breads and pastries, freshly baked every day. Visit The Flour Pot today!",
    ogImage: "https://bit.ly/4iDc4my",
    ogUrl: "https://www.theflourpot.com",
    ogType: "website",
    ogSiteName: "The Flour Pot",
  };

  Object.keys(defaultValues).forEach((id) => {
    const input = document.getElementById(id);
    if (input) {
      input.value = defaultValues[id];
      input.defaultValue = defaultValues[id];
      handlePlaceholder(input);
    }
  });

  const faviconPlaceholder = document.querySelector(".favicon-placeholder");
  if (faviconPlaceholder) {
    faviconPlaceholder.style.backgroundImage = `url(${defaultValues.favicon})`;
  }

  const ogImagePlaceholder = document.querySelector(".ogImage-placeholder");
  if (ogImagePlaceholder) {
    ogImagePlaceholder.style.backgroundImage = `url(${defaultValues.ogImage})`;
  }

  generateMetaTags();
};
