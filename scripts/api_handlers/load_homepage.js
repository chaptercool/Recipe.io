document.addEventListener('DOMContentLoaded', () => {
    async function getRandomRecipes() {
        const url = 'https://all-in-one-recipe-api.p.rapidapi.com/details/10236';
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

    async function loadHomepage() {
        let html = '';
        let recipeJSON = await getRandomRecipes();

        // Check if recipeJSON is defined
        if (recipeJSON && recipeJSON.recipe && recipeJSON.recipe.data) {
            let recipe_block = `<div class="recipe_overview">
                    <a href="/recipeoverview.html?id=10236" class="recipe_title">${recipeJSON.recipe.data.Name}</a>
                    <p class="recipe_desc">${recipeJSON.recipe.data.Description}</p>
                    <div class="add_info">
                        <span class="add_info_text"><img src="/resources/ico/hotel_class_48dp_FILL1_wght700_GRAD0_opsz48.svg" alt="star" class="addico">${recipeJSON.recipe.data.Rating}</span>
                        <span class="add_info_separator">
                            <!-- | -->
                        </span>
                        <span class="add_info_text"><img src="/resources/ico/receipt_long_48dp_FILL0_wght400_GRAD0_opsz48.svg" alt="" class="addico"><a href="" id="category_val">${recipeJSON.recipe.data.Category}</a></span>
                    </div>
                </div>`;

            html += recipe_block;
            
            let container = document.querySelector('.query');
            container.innerHTML = html;
        } else {
            console.error("Failed to load recipes. Recipe data is undefined.");
        }
    }

    loadHomepage();
});
