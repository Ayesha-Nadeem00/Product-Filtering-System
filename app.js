
//searchProducts()
 
function searchProducts(productList, term) {
  var result = [];                          
  var lowerTerm = term.toLowerCase();       

  for (var i = 0; i < productList.length; i++) {
    var product = productList[i];
    var lowerName = product.name.toLowerCase();

    
    if (lowerName.indexOf(lowerTerm) !== -1) {
      result[result.length] = product;     
    }
  }

  return result;
}


  //filterByCategory()
function filterByCategory(productList, category) {
  
  if (category === "all") {
    return productList;
  }

  var result = [];

  for (var i = 0; i < productList.length; i++) {
    var product = productList[i];

    if (product.category === category) {
      result[result.length] = product;
    }
  }

  return result;
}


//sortByPrice()
function sortByPrice(productList, direction) {
  if (direction === "default") {
    return productList;
  }

  var sorted = [];
  for (var i = 0; i < productList.length; i++) {
    sorted[i] = productList[i];
  }

  for (var i = 0; i < sorted.length; i++) {
    for (var j = 0; j < sorted.length - 1 - i; j++) {

      var shouldSwap = false;

      if (direction === "low-high" && sorted[j].price > sorted[j + 1].price) {
        shouldSwap = true;  
      }

      if (direction === "high-low" && sorted[j].price < sorted[j + 1].price) {
        shouldSwap = true;  
      }

      
      if (shouldSwap) {
        var temp    = sorted[j];
        sorted[j]   = sorted[j + 1];
        sorted[j + 1] = temp;
      }
    }
  }

  return sorted;
}

//createProductCard()
function createProductCard(product) {

  var card = document.createElement("div");
  card.className = "product-card";

  var imgArea = document.createElement("div");
  imgArea.className = "product-img";
  imgArea.textContent = product.emoji;

  var body = document.createElement("div");
  body.className = "product-body";

  var name = document.createElement("div");
  name.className = "product-name";
  name.textContent = product.name;

  
  var cat = document.createElement("span");
  cat.className = "product-category";
  cat.textContent = product.category;


  var price = document.createElement("div");
  price.className = "product-price";
  price.textContent = "PKR " + product.price.toFixed(2);

  
  var btn = document.createElement("button");
  btn.type= "button";
  btn.className = "add-btn";
  btn.textContent = "Add to Cart";

btn.onclick = function () {
    alert(product.name + " added to cart successfully!");
};

  
  body.appendChild(name);
  body.appendChild(cat);
  body.appendChild(price);
  body.appendChild(btn);

  card.appendChild(imgArea);
  card.appendChild(body);

  return card;
}


//renderProducts()
function renderProducts(filteredList) {
  var grid       = document.getElementById("productGrid");
  var emptyState = document.getElementById("emptyState");
  var countLabel = document.getElementById("resultsCount");

  countLabel.textContent = "Showing " + filteredList.length + " product" +
 (filteredList.length === 1 ? "" : "s");

  
  grid.innerHTML = "";

  
  if (filteredList.length === 0) {
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  for (var i = 0; i < filteredList.length; i++) {
    var card = createProductCard(filteredList[i]);
    grid.appendChild(card);
  }
}



  //applyFilters()
function applyFilters() {
  
  var searchTerm = document.getElementById("searchInput").value;
  var category   = document.getElementById("categoryFilter").value;
  var sortOrder  = document.getElementById("priceSort").value;
  var result = products;

  result = searchProducts(result, searchTerm);

  result = filterByCategory(result, category);

  result = sortByPrice(result, sortOrder);

  renderProducts(result);
}


applyFilters();   