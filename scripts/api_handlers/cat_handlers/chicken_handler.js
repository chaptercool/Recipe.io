const baseUrl = 'https://all-in-one-recipe-api.p.rapidapi.com/categories/';

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
const urlParams = getUrlVars()["catname"];

const category = urlParams;

document.addEventListener('DOMContentLoaded', () => {
    async function getCatRecipes() {
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

    async function loadRecipesChicken() {
        let html = '';
        let recipeJSON = await getCatRecipes();

            for (i = 0; i<= 30; i++) {
                let recipe_block = `<div class="recipe_overview">
                <a href="/recipeoverview.html?id=${recipeJSON.categories.data[i].id}" class="recipe_title">${recipeJSON.categories.data[i].name}</a>
                <div class="add_info">
                    <span class="add_info_text"><img src="/resources/ico/hotel_class_48dp_FILL1_wght700_GRAD0_opsz48.svg" alt="star" class="addico">4.5</span>
                    <span class="add_info_separator">
                        <!-- | -->
                    </span>
                    <span class="add_info_text"><img src="/resources/ico/calendar_clock_48dp_FILL0_wght400_GRAD0_opsz48.svg" alt="" class="addico"><span id="time_val">2024-01-01 16:00</span></span>
                </div>
            </div>`
                html += recipe_block;
            }
            let catname = document.querySelector('.fcategory_title');
            catname.innerHTML = category;
            let container = document.querySelector('.query');
            container.innerHTML = html;
    }

    loadRecipesChicken();
});
