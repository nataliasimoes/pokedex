const pokemonName = document.querySelector('.pokemon__name');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonForm = document.querySelector('.form');
const input = document.querySelector('.input__search')
const btnPrev = document.querySelector('.btn_prev');
const btnNext = document.querySelector('.btn_next');

let searchPokemon = 1

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon
    }`
  );

  if (APIResponse.status === 200) {
    const data = await APIResponse.json()

    return data
  }
  else {
    return null
  }
};


const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Loading...'
  pokemonNumber.innerHTML = ''

  const data = await fetchPokemon(pokemon);
  if (data) {
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    searchPokemon = data.id
  } else {
    pokemonName.innerHTML = 'Pokemon not found';
    pokemonNumber.innerHTML = '';
    pokemonImage.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';
  }
}


pokemonForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const pokemon = input.value.toLowerCase()
  renderPokemon(pokemon);
  input.value = '';
})

btnPrev.addEventListener('click', (event) => {
  if (searchPokemon > 1) {
    searchPokemon--
    renderPokemon(searchPokemon)
  }
})

btnNext.addEventListener('click', (event) => {
  searchPokemon++
  renderPokemon(searchPokemon)
})


renderPokemon(searchPokemon)

