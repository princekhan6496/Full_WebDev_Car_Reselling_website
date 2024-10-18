document.getElementById("filterButton").addEventListener("click", filterProducts);

function filterProducts() {
    const selectedPriceRange = document.getElementById("price").value;
    const products = document.querySelectorAll(".img");

    products.forEach(product => {
        const productPrice = parseInt(product.getAttribute("data-price"));

        let priceMatch = true;
        if (selectedPriceRange !== "all") {
            const [minPrice, maxPrice] = selectedPriceRange.split("-");
            if (maxPrice) {
                priceMatch = productPrice >= parseInt(minPrice) && productPrice <= parseInt(maxPrice);
            } else {
                priceMatch = productPrice >= parseInt(minPrice);
            }
        }

        if (selectedPriceRange === "all" || priceMatch) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}
