
var products = [
  { id: 1,  name: "Wireless Headphones",    category: "Electronics", price: 3500  },
  { id: 2,  name: "Bluetooth Speaker",      category: "Electronics", price: 2500 },
  { id: 3,  name: "Smartphone Stand",       category: "Electronics", price: 1500 },
  { id: 4,  name: "USB-C Charging Cable",   category: "Electronics", price: 1800  },
  { id: 5,  name: "Laptop Sleeve",          category: "Electronics", price: 1900  },
  { id: 6,  name: "Joggers",          category: "Sports",      price: 4599  },
  { id: 7,  name: "Yoga Mat",               category: "Sports",      price: 800  },
  { id: 8,  name: "Water Bottle",           category: "Sports",      price: 2800  },
  { id: 9,  name: "Jump Rope",              category: "Sports",      price: 1200 },
  { id: 10, name: "Resistance Bands",       category: "Sports",      price: 1400  },
  { id: 11, name: "Men's T-Shirt",          category: "Clothing",    price: 1799  },
  { id: 12, name: "Women's Jacket",         category: "Clothing",    price: 5400  },
  { id: 13, name: "Denim Jeans",            category: "Clothing",    price: 3400  },
  { id: 14, name: "Winter Scarf",           category: "Clothing",    price: 1300  },
  { id: 15, name: "Sneakers",               category: "Clothing",    price: 6400  },
  { id: 16, name: "JavaScript for Beginners", category: "Books",     price: 1300  },
  { id: 17, name: "Clean Code",             category: "Books",       price: 1600  },
  { id: 18, name: "The Pragmatic Programmer", category: "Books",     price: 1599  },
  { id: 19, name: "Design Patterns",        category: "Books",       price: 390  },
  { id: 20, name: "Python Crash Course",    category: "Books",       price: 699  },
  { id: 21, name: "Table Lamp",             category: "Home",        price: 3400  },
  { id: 22, name: "Coffee Mug Set",         category: "Home",        price: 2700  },
  { id: 23, name: "Scented Candle",         category: "Home",        price: 2199 },
  { id: 24, name: "Wall Clock",             category: "Home",        price: 2300  },
  { id: 25, name: "Pillow",           category: "Home",        price: 1600 },
  { id: 26, name: "Smart Watch",           category: "Electronic",        price: 6788 },
  { id: 27, name: "Air Purifier",           category: "Home",        price: 2499 },
  { id: 28, name: "Football",           category: "Sports",        price: 3499}
];


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