function fetchSessionData() {
    fetch('/session-data')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.username) {
                // Display user details on the page
                document.getElementById('Bio').innerText = data.Bio;
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


document.addEventListener('DOMContentLoaded', function() {
    fetch('/session-data')
        .then(response => response.json())
        .then(data => {
            if (data.username) {
                document.getElementById('Bio').value = data.Bio;
                document.getElementById('fname').value = data.fname;
                document.getElementById('lname').value = data.lname;
                document.getElementById('email').value = data.email;
                document.getElementById('Mno').value = data.Mno;
                document.getElementById('password').value = data.password;
            }
        })
        .catch(error => console.error('Error fetching session data:', error));
});

document.getElementById('editBtn').addEventListener('click', function() {
    var profileInfo = document.getElementById('profile-card2');
    
    // Toggle the active class
   
        profileInfo.style.display = 'block';
        setTimeout(() => {
            profileInfo.classList.toggle('active');
        }, 10);  // Add a slight delay to ensure the display change is applied before the transition
});

document.getElementById('logoutBtn').addEventListener('click', function() {
    fetch('/logout')
        .then(response => {
            if (response.ok) {
                window.location.href = '/login';  // Redirect to login page after logout
            } else {
                alert('Logout failed!');
            }
        })
        .catch(error => console.error('Error during logout:', error));
});



// Call function when the page loads
window.onload = fetchSessionData;
