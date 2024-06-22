const EmojiProfile = document.getElementById("emoji_itself");
const Username = document.getElementById("userdata");
const Favorites = document.getElementById("favorites_loader");
const loggedInUser = sessionStorage.getItem("loggedInUser");

if (!loggedInUser) {
    window.location.href = "login.html";
} else {
    loadProfile(loggedInUser);

}


function loadProfile(username){
    Username.textContent = username;
    const user = JSON.parse(localStorage.getItem(username));
    EmojiProfile.textContent = user.emoji;
    let favorite_section = `<section class="favorites">
            <h1 class="global_title">Favorite recipes</h1>
            <div class="recipe_overview">
                <a href="/recipeoverview.html" class="recipe_title">Famous Chicken Adobo</a>
                <p class="recipe_desc">Classic chicken adobo recipe that's simple to make and loved by all who try it. It has been modified to be a bit saucier than traditional adobo and is delicious served over rice.</p>
                <div class="add_info">
                    <span class="add_info_text"><img src="/resources/ico/hotel_class_48dp_FILL1_wght700_GRAD0_opsz48.svg" alt="star" class="addico">4.5</span>
                    <span class="add_info_separator">
                        <!-- | -->
                    </span>
                    <span class="add_info_text"><img src="/resources/ico/calendar_clock_48dp_FILL0_wght400_GRAD0_opsz48.svg" alt="" class="addico"><span id="time_val">2024-01-01 16:00</span></span>
                    <span class="add_info_separator">
                        <!-- | -->
                    </span>
                    <span class="add_info_text"><img src="/resources/ico/receipt_long_48dp_FILL0_wght400_GRAD0_opsz48.svg" alt="" class="addico"><a href="" id="category_val">Chicken</a></span>
                </div>
            </div>
        </section>`;
    Favorites.innerHTML = favorite_section;
}

document.getElementById("logout").addEventListener("click", function(){
    sessionStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
});