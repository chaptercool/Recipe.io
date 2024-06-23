const baseUrl = 'https://all-in-one-recipe-api.p.rapidapi.com/details/';

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
const urlParams = getUrlVars()["id"];

const category = urlParams;

document.addEventListener('DOMContentLoaded', () => {
    async function getRecipe() {
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

    async function loadList_time(){
        let recipeJSON = await getRecipe();
        let html_el = '';
        recipeJSON.recipe.data.Time.forEach(element => {
            let recipe_list = `<li class="rdl_el">${element}</li>`;
            html_el += recipe_list;
        });
        return html_el;
    }

    async function loadList_ingredients(){
        let recipeJSON = await getRecipe();
        let html_el = '';
        recipeJSON.recipe.data.Ingredients.forEach(element => {
            let recipe_list = `<li class="rdl_el">${element}</li>`;
            html_el += recipe_list;
        });
        return html_el;
    }

    async function loadList_directions(){
        let recipeJSON = await getRecipe();
        let html_el = '';
        recipeJSON.recipe.data.Directions.forEach(element => {
            let recipe_list = `<li class="rdl_el">${element}</li>`;
            html_el += recipe_list;
        });
        return html_el;
    }

    async function loadList_nutritions(){
        let recipeJSON = await getRecipe();
        let html_el = '';
        recipeJSON.recipe.data.Nutritions.forEach(element => {
            let recipe_list = `<li class="rdl_el">${element}</li>`;
            html_el += recipe_list;
        });
        return html_el;
    }

    async function loadRecipe() {
        let recipeJSON = await getRecipe();
        let html = '';

        let timeList = await loadList_time();
        let ingredientsList = await loadList_ingredients();
        let directionsList = await loadList_directions();
        let nutritionsList = await loadList_nutritions();

        let recipe_block = `<section class="recipe">
            <h1 class="global_title">${recipeJSON.recipe.data.Name}</h1>
            <p class="global_desc">${recipeJSON.recipe.data.Description}</p>

            <h2 class="rd_sectionname">Time</h2>
            <ul class="rd_list">
                ${timeList}
            </ul>

            <h2 class="rd_sectionname">Ingredients</h2>
            <ul class="rd_list">
                ${ingredientsList}
            </ul>

            <h2 class="rd_sectionname">Directions</h2>
            <ol class="rd_list">
                ${directionsList}
            </ol>

            <h2 class="rd_sectionname">Nutritions</h2>
            <ul class="rd_list">
                ${nutritionsList}
            </ul>

            <div class="add_info">
                <span class="add_info_text"><img src="/resources/ico/hotel_class_48dp_FILL1_wght700_GRAD0_opsz48.svg" alt="star" class="addico">${recipeJSON.recipe.data.Rating}</span>
                <span class="add_info_separator">
                    <!-- | -->
                </span>
                <span class="add_info_text"><img src="/resources/ico/calendar_clock_48dp_FILL0_wght400_GRAD0_opsz48.svg" alt="" class="addico"><span id="time_val">2024-01-01 16:00</span></span>
                <span class="add_info_separator">
                    <!-- | -->
                </span>
                <span class="add_info_text"><img src="/resources/ico/receipt_long_48dp_FILL0_wght400_GRAD0_opsz48.svg" alt="" class="addico"><a href="category-filter.html?catval=${recipeJSON.recipe.data.Category}" id="category_val">${recipeJSON.recipe.data.Category}</a></span>
                <span class="add_info_separator">
                    <!-- | -->
                </span>
                <span class="add_info_text"><img src="/resources/ico/favorite_48dp_FILL0_wght400_GRAD0_opsz48.svg" alt="" class="addico"><a href="" id="category_val">Favorite</a></span>
            </div>
        </section>`;
        
        html += recipe_block;
        
        let container = document.querySelector('.query');
        container.innerHTML = html;
    }

    loadRecipe();
});
