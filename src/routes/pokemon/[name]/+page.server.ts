export async function load({ params }) {

    const pokeName = params.name

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
    const retrievedPokemon = await response.json();
    //console.log(retrievedPokemon);

    return {
        pokemon: {
            name: retrievedPokemon.name,
            id: retrievedPokemon.id,
            image: retrievedPokemon.sprites.other['official-artwork'].front_default,
            moves: retrievedPokemon.moves.map((move: any) => move.move.name),
        }
    }
}