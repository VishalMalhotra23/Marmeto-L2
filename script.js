function displayProducts() {
  fetch(
    "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
  )
    .then((response) => response.json())
    .then((data) => {
      data.categories.forEach((category) => {
        const categoryDiv = document.getElementById(
          category.category_name.toLowerCase()
        );

        category.category_products.forEach((product) => {
          const productCard = document.createElement("div");
          productCard.classList.add("product-card");

          productCard.innerHTML = `
                        <img src="${product.image}" alt="${product.title}">
                        <div class="product-details">
                            ${
                              product.badge_text
                                ? `<span class="badge">${product.badge_text}</span>`
                                : ""
                            }
                            <div class="title-vendor">
                                <h3>${truncateString(product.title, 10)}</h3>
                                <p class="vendor">&#8226; ${product.vendor}</p>
                            </div>
                            <div class="price-row">
                                <p class="price"><strong>Rs: ${
                                  product.price
                                }</strong></p>
                                <p class="compare-price"> <del>${
                                  product.compare_at_price
                                }</del></p>
                                <p class="discount">${calculateDiscount(
                                  product.price,
                                  product.compare_at_price
                                )}% off</p>
                            </div>
                            <button class="add-to-cart">Add to Cart</button>
                        </div>
                        `;

          categoryDiv.appendChild(productCard);
        });
      });
    })
    .catch((error) => console.error("Error fetching products:", error));
}

document.getElementById("men").style.display = "flex";
document.getElementById("men").style.flexWrap = "wrap";

displayProducts();

// Function to handle tab switching
function openCategory(evt, category) {
  var tabcontent = document.getElementsByClassName("tabcontent");
  for (var i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  var tablinks = document.getElementsByClassName("tablinks");
  for (var i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(category).style.display = "flex";
  document.getElementById(category).style.flexWrap = "wrap";
  evt.currentTarget.className += " active";
}

function calculateDiscount(price, comparePrice) {
  const discountPercentage = Math.round(
    ((comparePrice - price) / comparePrice) * 100
  );
  return discountPercentage;
}

function truncateString(str, maxLength) {
  return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
}
