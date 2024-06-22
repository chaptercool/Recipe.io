document.getElementById("register_form").addEventListener("submit", function(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("password_repeat").value;
    const emoji = document.getElementById("emoji").value;
    const emojiCheckVal = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g

    function isGoodPassword(password) {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /[0-9]/.test(password);
        const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
        if (password.length < minLength) {
            alert("Password must be at least 8 characters long.");
            return false;
        }
        if (!hasUpperCase) {
            alert("Password must contain at least one uppercase letter.");
            return false;
        }
        if (!hasLowerCase) {
            alert("Password must contain at least one lowercase letter.");
            return false;
        }
        if (!hasNumbers) {
            alert("Password must contain at least one number.");
            return false;
        }
        if (!hasSpecialChars) {
            alert("Password must contain at least one special character.");
            return false;
        }
    
        return true;
    }

    if (localStorage.getItem(username)) {
        alert("This username is already taken. Please choose another one.");
    } else if (password != confirmPassword) {
        alert("Passwords do not match.");
    } else if(isGoodPassword(password) == false) {
        console.log("Password is not good");
    } else if (!emoji.match(emojiCheckVal)) {
        alert("Entered symbol is not an Unicode Emoji. Please enter a valid one.");
    } else {
        const user = {
            password: password,
            emoji: emoji,
            recipes: []
        };
        localStorage.setItem(username, JSON.stringify(user));
        alert("Registration successful! You can now log in.");
        window.location.href = "main.html";
    }
});