const productsContainer = document.querySelector(".products-container");
const loadMorebtn = document.querySelector(".load-more-btn");

let currentStep = 0;
async function fetchListProducts(getCurrentStep) {
  try {
    const response = await fetch(
      `https://dummyjson.com/products?limit=5&skip=${
        getCurrentStep === 0? 0: getCurrentStep * 10
      }`,
      {
        method: "GET",
      }
    );
    const result = await response.json();
    console.log(result);
    if (result && result.products) displayProducts(result.products);
  } catch (e) {
    console.log(e);
  }
}

function displayProducts(productsList) {
  console.log(productsList);

  productsList.forEach((productItem) => {
    const productItemWrapper = document.createElement("div");
    const productTitle = document.createElement("p");
    const productThumbnail = document.createElement("img");
    const productDescription = document.createElement("p");
    const ProductPrice = document.createElement("p");

    productTitle.textContent = productItem.title;
    productDescription.textContent = productItem.description;
    productThumbnail.src = productItem.thumbnail;
    ProductPrice.textContent = productItem.price;

    productItemWrapper.classList.add("product-item-wrapper");
    productTitle.classList.add("product-title");
    productThumbnail.classList.add("product-img");
    ProductPrice.classList.add("product-price");
    productDescription.classList.add("product-desc");

    productItemWrapper.appendChild(productThumbnail);
    productItemWrapper.appendChild(productTitle);
    productItemWrapper.appendChild(ProductPrice);
    productItemWrapper.appendChild(productDescription);

    productsContainer.appendChild(productItemWrapper);
  });
if(productsContainer.children.length===30){
    loadMorebtn.setAttribute('disabled','true')
}
  console.log(productsContainer.children.length);
}

fetchListProducts(currentStep);

loadMorebtn.addEventListener("click", () => {

    fetchListProducts((currentStep+=1));
});
