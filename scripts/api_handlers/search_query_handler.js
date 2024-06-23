const baseUrl = 'https://all-in-one-recipe-api.p.rapidapi.com/search/';

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function insertValueIntoUrl(value) {
    return `${baseUrl}${value}`;
}
const urlParams = getUrlVars()["searchbar"];

const category = urlParams;

document.addEventListener('DOMContentLoaded', () => {
    async function getRecipesFromQuery() {
        const url = insertValueIntoUrl(category);
        console.log(url); 
        const options = {
	    method: 'GET',
	    headers: {
		    'x-rapidapi-key': '16e1b7b0d8msh5301b4a7a319bd0p13ef45jsnfc6c2d4f67ed',
		    'x-rapidapi-host': 'all-in-one-recipe-api.p.rapidapi.com'
	    }
};
        
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    async function loadRecipesFromQuery() {
        let html = '';
        let recipeJSON = await getRecipesFromQuery();
            recipeJSON.recipes.data.forEach((recipe) => {
                let recipe_block = `<div class="recipe_overview">
                <a href="/recipeoverview.html?id=${recipe.id}" class="recipe_title">${recipe.name}</a>
                <div class="add_info">
                <span class="add_info_text"><img src="/resources/ico/hotel_class_48dp_FILL1_wght700_GRAD0_opsz48.svg" alt="star" class="addico">4.0</span>
                <span class="add_info_separator">
                    <!-- | -->
                </span>
                <span class="add_info_text"><img src="/resources/ico/calendar_clock_48dp_FILL0_wght400_GRAD0_opsz48.svg" alt="" class="addico"><span id="time_val">2024-01-01 16:00</span></span>
                
            </div>
            </div>`
                html += recipe_block;
            });
            let keyword = document.querySelector('.keyword');
            keyword.innerHTML = category;
            let container = document.querySelector('.query');
            container.innerHTML = html;
    }

    loadRecipesFromQuery();
});
