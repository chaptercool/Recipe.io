const loggedInUser = sessionStorage.getItem('loggedInUser');
const emojiCheckVal = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g

if (!loggedInUser) {
    window.location.href = 'login.html';
} else {
    loadProfile(loggedInUser)
}

function loadProfile(username) {
    const user = JSON.parse(localStorage.getItem(username));
    document.getElementById('emoji_ico').value = user.emoji;
    document.getElementById('username').value = username;
    document.getElementById('userpassword').value = user.password;
}

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

document.getElementById('save').addEventListener('click', function(e) {
    e.preventDefault();
    const newEmoji = document.getElementById('emoji_ico').value;
    const newUsername = document.getElementById('username').value;
    const newPassword = document.getElementById('userpassword').value;

    if (newUsername !== loggedInUser && localStorage.getItem(newUsername)) {
        alert("This username is already taken. Please choose another one.");
    } else if(isGoodPassword(newPassword) == false) {
        alert("Password is not good");
    } else if (!newEmoji.match(emojiCheckVal)) {
        alert("Entered symbol is not an Unicode Emoji. Please enter a valid one.");
    } else {
        const user = JSON.parse(localStorage.getItem(loggedInUser));
        user.password = newPassword;
        user.emoji = newEmoji;

        localStorage.removeItem(loggedInUser);
        localStorage.setItem(newUsername, JSON.stringify(user));
        sessionStorage.setItem('loggedInUser', newUsername);
        alert("Profile updated successfully!");
        window.location.href = "profile.html";
    }
});
