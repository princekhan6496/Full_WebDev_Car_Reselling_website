var video = document.getElementById('introVideo');
var videoContainer = document.getElementById('videoContainer');
var homepageContent = document.getElementById('homepageContent');


video.addEventListener('ended', function() {

    videoContainer.style.display = 'none';
    homepageContent.style.display = 'flex';
});


window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') { 
        videoContainer.style.display = 'none';
        homepageContent.style.display = 'flex';
    }
});
       // Function to fetch session data (username)
       function fetchSessionData() {
        fetch('/session-data')
            .then(response => response.json())
            .then(data => {
                if (data.username) {
                    // Display user details on the page
                    document.getElementById('login').innerHTML= data.username
                    document.getElementById('fname').innerText = data.fname;
                    document.getElementById('lname').innerText = data.lname;
                    document.getElementById('email').innerText = data.email;
                    document.getElementById('Mno').innerText = data.Mno;
                } else {
                    alert('No user logged in!');
                }
            })
            .catch(error => console.error('Error fetching session data:', error));
    }

    // Call function when the page loads
    window.onload = fetchSessionData;

       // Sample products data with URLs for redirection
const productsData = [
    { name: "Bentley", category: "car", price: "", url: "bentley.html" },
    { name: "Bentley Continen", category: "car", price: "", url: "bContinen.html" },
    { name: "Maybach", category: "car", price: "", url: "Maybach.html" },
    { name: "Maybach S560", category: "car", price: "", url: "Maybach_s560.html" },
    { name: "BMW", category: "car", price: "", url: "BMW.html" },
    { name: "BMW M5", category: "car", price: "", url: "BMW_m5.html" },
    { name: "Porsche", category: "car", price: "", url: "porsche.html" },
    { name: "Porsche 911 Carrera", category: "car", price: "", url: "porsche_911.html" },
    { name: "McLaren", category: "car", price: "", url: "mclaren.html" },
    { name: "McLaren 720", category: "car", price: "", url: "MC720.html" },
    { name: "Rolls-Royce", category: "car", price: "", url: "rolls_royce.html" },
    { name: "Rolls-Royce Cullinan", category: "car", price: "", url: "Rculli.html" },
    { name: "Rolls-Royce Phantom", category: "car", price: "", url: "Rphantom.html" },
    { name: "Mercedes", category: "car", price: "", url: "mercedes.html" },
    { name: "Mercedes AMG GT", category: "car", price: "", url: "mercedes_amg.html" },
    { name: "Mercedes G class", category: "car", price: "", url: "mercedes_G.html" },
    { name: "Lamborghini", category: "car", price: "", url: "lamborghini.html" },
    { name: "Lamborghini Sian", category: "car", price: "", url: "Lsian.html" },
    { name: "Ferrari", category: "car", price: "", url: "ferrari.html" },
    { name: "Ferrari 488", category: "car", price: "", url: "ferrari488.html" },
    { name: "Ferrari F8", category: "car", price: "", url: "ferrariF8.html" },
    { name: "Ferrari Roma", category: "car", price: "", url: "ferrariRoma.html" },
    { name: "Ferrari SF 90", category: "car", price: "", url: "ferrariSF.html" },
    { name: "koenigsegg", category: "car", price: "", url: "koenigsegg.html" },
    { name: "koenigsegg Jesko", category: "car", price: "", url: "kJesco.html" },
    { name: "koenigsegg Regera", category: "car", price: "", url: "kragera.html" },
    { name: "koenigsegg Gamera", category: "car", price: "", url: "kgamera.html" },
    { name: "Pagani", category: "car", price: "", url: "pagani.html" },
    { name: "Pagani Dinastia", category: "car", price: "", url: "Dinastia.html" },
    { name: "Pagani Macchina", category: "car", price: "", url: "volante.html" },
    { name: "Bugatti", category: "car", price: "", url: "bugatti.html" },
    { name: "Bugatti Centodieci", category: "car", price: "$8.2 million", url: "bCentodi.html" },
    { name: "Bugatti Chiron", category: "car", price: "", url: "VM_B-C.html" },
    { name: "Bugatti Veyron", category: "car", price: "", url: "BChiron.html" }
];

function showSuggestions(inputValue) {
    let suggestionsBox = document.getElementById("suggestions");
    suggestionsBox.innerHTML = ""; // Clear previous suggestions

    if (inputValue.length === 0) {
        suggestionsBox.style.display = "none"; // Hide suggestions if input is empty
        return;
    }

    let filteredSuggestions = productsData.filter(product =>
        product.name.toLowerCase().startsWith(inputValue.toLowerCase())
    );

    if (filteredSuggestions.length > 0) {
        suggestionsBox.style.display = "block"; // Show suggestions box
        filteredSuggestions.forEach(product => {
            let suggestionDiv = document.createElement("div");
            suggestionDiv.textContent = product.name;
            suggestionDiv.onclick = function () {
                window.location.href = product.url; // Redirect to the product page on click
            };
            suggestionsBox.appendChild(suggestionDiv);
        });
    } else {
        suggestionsBox.style.display = "none"; // Hide suggestions if no match
    }
}

// Function to redirect to the first matching product page when "Enter" is pressed
function searchAndRedirect(query) {
    let filteredProducts = productsData.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredProducts.length > 0) {
        window.location.href = filteredProducts[0].url; // Redirect to the first match
    } else {
        alert("No products found!"); // Show a message if no products match
    }
}

// Handle pressing "Enter" to search
document.getElementById("search").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        searchAndRedirect(this.value); // Search based on current input value
        document.getElementById("suggestions").style.display = "none"; // Hide suggestions
    }
});
