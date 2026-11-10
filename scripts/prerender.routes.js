// pokemons/page/1
// pokemons/page/2
// pokemons/page/3
// pokemons/page/4
// pokemons/page/5

// /pokemon-detail/1
// /pokemon-detail/2
// /pokemon-detail/3
// /pokemon-detail/4
// /pokemon-detail/5
// /pokemon-detail/6
// /pokemon-detail/7
// /pokemon-detail/8
// /pokemon-detail/9
// /pokemon-detail/10
// /pokemon-detail/11
// /pokemon-detail/12
// /pokemon-detail/electrode



const Total_pokemons = 100;
const total_pokemons_page = 5;
(
    async () => {

        const fs = require('fs');
        console.log('Generating routes for prerendering');
        // const pokemonId = Array.from({ length: Total_pokemons }, (_, i) => {
        //     i = i + 1;
        //     return i;
        // });

        // const pokemonPage = Array.from({ length: total_pokemons_page }, (_, i) => {
        //     i = i + 1;
        //     return i;
        // });


        // let fileContent = pokemonId.map(id => `/pokemon/page/${id}`).join('\n');
        // fileContent += '\n';
        // fileContent += pokemonPage.map(page => `/pokemon-detail/${page}`).join('\n');

        // for (let index = 0; index <= total_pokemons_page; index++) {
        //     const page = index + 1;
        //     fileContent += `\n/pokemon-detail/${page}`;
            
        // }

        // por nombre de pokemons
         let fileContent = '';
        let pokemonListName = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${Total_pokemons}`) 
            .then(res => res.json());

        let pokemonListPage =  pokemonListName.results.map((pokemon, index) => {
             fileContent += '\n';
              console.log('pokemon', pokemon.name, index);
              return `/pokemon/page/${index + 1}`;
            
        })
            
        fileContent = pokemonListName.results.map(pokemon => `/pokemon-detail/${pokemon.name}`).join('\n');
        fileContent += '\n';
        fileContent += pokemonListPage.join('\n');
        // console.log('fileContent', fileContent);

        // fileContent += '\n';
        // fileContent += fileContent.results.map(pokemon => `/pokemon-detail/${pokemon.name}`).join('\n'); 
        // console.log('pokemonListName', pokemonListName);



        fs.writeFileSync('routes.txt', fileContent);

        console.log('Generating routes for prerendering', fileContent);
    }
)()