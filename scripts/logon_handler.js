document.getElementById("logon_form").addEventListener("submit", function(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const user = JSON.parse(localStorage.getItem(username));

    if (user && user.password === password) {
        sessionStorage.setItem("loggedInUser", username);
        window.location.href = "profile.html";
    } else {
        alert("Invalid username or password. Please try again.");
    }
});