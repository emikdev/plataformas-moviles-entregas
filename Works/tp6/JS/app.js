document.addEventListener("DOMContentLoaded", () => {
    const pokemonList = document.getElementById("pokemon-list");
    const loadedPokemonIds = new Set();
  
    async function getPokemonList(start, count) {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${count}&offset=${start}`);
        const data = await response.json();
  
        const pokemonDataArray = await Promise.all(data.results.map(async (pokemon) => {
          const id = parseInt(pokemon.url.split("/")[6]);
          if (!loadedPokemonIds.has(id)) {
            loadedPokemonIds.add(id);
            const detailsResponse = await fetch(pokemon.url);
            const detailsData = await detailsResponse.json();
            const types = detailsData.types.map((type) => type.type.name);
            return { id, name: pokemon.name, types, image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` };
          }
        }));
  
        for (const pokemon of pokemonDataArray) {
          createPokemonCard(pokemon);
        }
      } catch (error) {
        console.error("Error al obtener la lista de Pokémon", error);
      }
    }
  
    function createPokemonCard(pokemon) {
      const card = document.createElement("div");
      card.className = "col-md-4 mb-4";
      card.innerHTML = `
        <div class="card">
          <img src="${pokemon.image}" alt="${pokemon.name}" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">${pokemon.name}</h5>
            <p class="card-text"><strong>Número en la Pokédex:</strong> ${pokemon.id}</p>
            <p class="card-text"><strong>Tipos:</strong> ${pokemon.types.join(", ")}</p>
            <button class="btn btn-primary more-info-button" data-toggle="modal" data-target="#pokemonInfoModal" data-pokemon-id="${pokemon.id}">
              Ver más
            </button>
          </div>
        </div>
      `;
  
      document.getElementById("pokemon-list").appendChild(card);
    }
  
    async function displayPokemonInfo(pokemonId) {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const pokemonData = await response.json();
  
        const weaknesses = [];
        const strengths = [];
        for (const type of pokemonData.types) {
          const typeData = await fetch(`https://pokeapi.co/api/v2/type/${type.type.name}`);
          const typeInfo = await typeData.json();
          for (const doubleDamageType of typeInfo.damage_relations.double_damage_to) {
            strengths.push(doubleDamageType.name);
          }
          for (const halfDamageType of typeInfo.damage_relations.half_damage_to) {
            weaknesses.push(halfDamageType.name);
          }
        }
  
        const modalContent = document.getElementById("pokemonInfoContent");
        modalContent.innerHTML = `
          <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}" class="pokemon-image">
          <p><strong>Altura:</strong> ${pokemonData.height}</p>
          <p><strong>Peso:</strong> ${pokemonData.weight}</p>
          <p><strong>Tipos:</strong> ${pokemonData.types.map((type) => type.type.name).join(", ")}</p>
          <p><strong>Debilidades:</strong> ${weaknesses.join(", ")}</p>
          <p><strong>Fortalezas:</strong> ${strengths.join(", ")}</p>
        `;
      } catch (error) {
        console.error("Error al obtener información adicional del Pokémon", error);
      }
    }
  
    pokemonList.addEventListener("click", (event) => {
      if (event.target.classList.contains("more-info-button")) {
        const pokemonId = event.target.getAttribute("data-pokemon-id");
        displayPokemonInfo(pokemonId);
      }
    });
  
    let lastLoadedPokemonId = 0;
  
    const loadMoreButton = document.getElementById("load-more-button");
    loadMoreButton.addEventListener("click", () => {
      getPokemonList(lastLoadedPokemonId + 0, 50);
      lastLoadedPokemonId += 50;
    });
  
    getPokemonList(0, 50);
  
    const scrollToTopButton = document.getElementById("scroll-to-top-button");
    scrollToTopButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollToTopButton.style.display = "block";
      } else {
        scrollToTopButton.style.display = "none";
      }
    });
  });
  