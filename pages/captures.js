import { useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import PokemonCard from '../components/PokemonCard'
import { pokemonList } from '../data/PokemonList'

const itemsPerPage = 50;

export default function Captures() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const totalPages = Math.ceil(pokemonList.length / itemsPerPage);

  const filteredPokemons = pokemonList.filter((pokemon) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    const isPokedexMatch = pokemon.pokedexNumber.toString() === searchTerm;

    const isNameMatch = pokemon.name.toLowerCase().includes(lowerCaseSearchTerm);

    return isPokedexMatch || isNameMatch;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedPokemons = filteredPokemons.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <MainLayout>
      <h1 className="text-4xl font-bold text-center my-8">Mes Pokémon Shiny Capturés</h1>
      
      {/* Champ de recherche */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Rechercher par nom ou numéro de Pokédex"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm w-full max-w-md"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 container mx-auto">
        {selectedPokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.pokedexNumber}
            name={pokemon.name}
            pokedexNumber={pokemon.pokedexNumber}
            image={`/images/pokemon/${pokemon.pokedexNumber}.png`}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-8 mb-16 space-x-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-6 py-2 rounded-md transition-all duration-300 ease-in-out ${
            currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          Précédent
        </button>

        <span className="text-lg">
          Page {currentPage} sur {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-6 py-2 rounded-md transition-all duration-300 ease-in-out ${
            currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          Suivant
        </button>
      </div>
    </MainLayout>
  )
}
