const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('webdev'));  // Serve static files like HTML

// Session setup
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

// Load user data from JSON file
let users = [];
fs.readFile('users.json', 'utf-8', (err, data) => {
    if (err) throw err;
    users = JSON.parse(data);  // Parse the user data from JSON file
});

// Route to serve login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'webdev', 'login.html'));
});

// Route to serve signup page
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'webdev', 'signup.html'));
});

// Route to serve login page
app.get('/error', (req, res) => {
    res.sendFile(path.join(__dirname, 'webdev', 'error.html'));
});

// Route to serve login page
app.get('/errorlogin', (req, res) => {
    res.sendFile(path.join(__dirname, 'webdev', 'errorlogin.html'));
});
app.get('/errorMo', (req, res) => {
    res.sendFile(path.join(__dirname, 'webdev', 'errorMo.html'));
});
// Route to handle signup
app.post('/signup', (req, res) => {
    const { fname, lname, email, Mno, username, password } = req.body;

    // Check if the mobile number is valid (Assuming a 10-digit number)
    const mobileNumberPattern = /^[0-9]{10}$/;
    if (!mobileNumberPattern.test(Mno)) {
        return res.redirect('/errorMo?message=InvalidMobileNumber');
    }

    // Check if the username already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
       return res.redirect('/error?message=UsernameExists'); 
    }

    // Add new user to users array
    const newUser = { fname, lname, email, Mno, username, password };
    users.push(newUser);

    // Save updated user data to users.json
    fs.writeFile('users.json', JSON.stringify(users, null, 2), (err) => {
        if (err) throw err;
        console.log('User added:', newUser);
        res.redirect('/login');  
    });
});

// Route to handle login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if user exists and password is correct
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        req.session.user = user;  // Store full user object in session
        res.redirect('/home');
    } else {
        return res.redirect('/errorlogin');
    }
});

// Route to serve home page
app.get('/home', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, 'webdev', 'home.html')); 
    } else {
        res.redirect('/login');  // Redirect to login if no session
    }
});

// Route to handle logout
app.get('/logout', (req, res) => {
    req.session.destroy();  // Clear session on logout
    res.redirect('/login');
});

// Route to fetch session data (for displaying user details on the home page)
app.get('/session-data', (req, res) => {
    if (req.session.user) {
        const { fname, lname, email, Mno, username, Bio } = req.session.user;
        res.json({ fname, lname, email, Mno, username, Bio });
    } else {
        res.json({ username: null });
    }
});

// Serve users.json file
app.get('/users', (req, res) => {
    const usersPath = path.join(__dirname, 'users.json');
    
    fs.readFile(usersPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        res.json(JSON.parse(data)); 
    });
});


// Route to serve the profile edit page
app.get('/profile', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, 'webdev', 'profile.html'));
    } else {
        res.redirect('/login');  
    }
});

// Route to handle profile edit form submission
app.post('/edit-profile', (req, res) => {
    if (req.session.user) {
        const { fname, lname, email, Mno, password,Bio } = req.body;

        // Find the logged-in user in the users array
        const userIndex = users.findIndex(user => user.username === req.session.user.username);

        if (userIndex !== -1) {
          
            users[userIndex].Bio = Bio;
            users[userIndex].fname = fname;
            users[userIndex].lname = lname;
            users[userIndex].email = email;
            users[userIndex].Mno = Mno;
            users[userIndex].password = password;

            
            fs.writeFile('users.json', JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                    return res.status(500).send('Error updating profile');
                }

               
                req.session.user = users[userIndex];

              
                res.redirect('/home');
            });
        } else {
            res.status(404).send('User not found');
        }
    } else {
        res.redirect('/login');
    }
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
