import MainLayout from '../layouts/MainLayout'
import PokemonCard from '../components/PokemonCard'
import { pokemonList } from '../data/PokemonList'

export default function Captures() {
  return (
    <MainLayout>
      <h1 className="text-4xl font-bold text-center my-8">Mes Pokémon Shiny Capturés</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 container mx-auto">
        {pokemonList && pokemonList.length > 0 ? (
          pokemonList.map((pokemon) => (
            <PokemonCard
              key={pokemon.pokedexNumber}
              name={pokemon.name}
              pokedexNumber={pokemon.pokedexNumber}
              image={`/images/pokemon/${pokemon.pokedexNumber}.png`}
              // Tu peux ajouter d'autres infos spécifiques ici (date, rencontres, etc.)
            />
          ))
        ) : (
          <p className="text-center text-gray-500">Aucune capture pour le moment.</p>
        )}
      </div>
    </MainLayout>
  )
}
