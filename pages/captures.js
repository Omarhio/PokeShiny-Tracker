import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import PokemonCard from "../components/PokemonCard";
import { pokemonList } from "../data/PokemonList";

const itemsPerPage = 24;

export default function Captures() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGeneration, setSelectedGeneration] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [sortOption, setSortOption] = useState("pokedexNumber");

  const filteredPokemons = pokemonList.filter((pokemon) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const isPokedexMatch = pokemon.pokedexNumber.toString() === searchTerm;
    const isNameMatch = pokemon.name
      .toLowerCase()
      .includes(lowerCaseSearchTerm);
    const isGenerationMatch =
      selectedGeneration === "all" ||
      (selectedGeneration === "1" && pokemon.pokedexNumber <= 151) ||
      (selectedGeneration === "2" &&
        pokemon.pokedexNumber > 151 &&
        pokemon.pokedexNumber <= 251) ||
      (selectedGeneration === "3" &&
        pokemon.pokedexNumber > 251 &&
        pokemon.pokedexNumber <= 386) ||
      (selectedGeneration === "4" &&
        pokemon.pokedexNumber > 387 &&
        pokemon.pokedexNumber <= 493) ||
      (selectedGeneration === "5" &&
        pokemon.pokedexNumber > 494 &&
        pokemon.pokedexNumber <= 649);

    const isTypeMatch =
      selectedType === "all" || pokemon.type.includes(selectedType);

    return (isPokedexMatch || isNameMatch) && isGenerationMatch && isTypeMatch;
  });

  // Tri par nom ou numéro du Pokédex
  const sortedPokemons = filteredPokemons.sort((a, b) => {
    if (sortOption === "name") {
      return a.name.localeCompare(b.name);
    } else {
      return a.pokedexNumber - b.pokedexNumber;
    }
  });

  const totalPages = Math.ceil(sortedPokemons.length / itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedPokemons = sortedPokemons.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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
      <h1 className="text-4xl font-bold text-center my-8">
        Mes Pokémon Shiny Capturés
      </h1>

      {/* Champ de recherche */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Rechercher par nom ou numéro de Pokédex"
          aria-label="Rechercher un Pokémon par son nom ou son numéro de Pokédex"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm w-full max-w-md"
        />
      </div>

      {/* Filtre par génération */}
      <div className="flex justify-center mb-4">
        <select
          value={selectedGeneration}
          onChange={(e) => setSelectedGeneration(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm"
        >
          <option value="all">Toutes les générations</option>
          <option value="1">1ère génération</option>
          <option value="2">2e génération</option>
          <option value="3">3e génération</option>
          <option value="4">4e génération</option>
          <option value="5">5e génération</option>
        </select>
      </div>

      {/* Filtre par type */}
      <div className="flex justify-center mb-4">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm"
        >
          <option value="all">Tous les types</option>
          <option value="Normal">Normal</option>
          <option value="Feu">Feu</option>
          <option value="Eau">Eau</option>
          <option value="Plante">Plante</option>
          <option value="Électrique">Électrique</option>
          <option value="Glace">Glace</option>
          <option value="Vol">Vol</option>
          <option value="Roche">Roche</option>
          <option value="Sol">Sol</option>
          <option value="Insecte">Insecte</option>
          <option value="Poison">Poison</option>
          <option value="Psy">Psy</option>
          <option value="Ténèbres">Ténèbres</option>
          <option value="Spectre">Spectre</option>
          <option value="Acier">Acier</option>
          <option value="Combat">Combat</option>
          <option value="Dragon">Dragon</option>
          {/* Ajouter les autres type ici */}
        </select>
      </div>

      {/* Option de tri */}
      <div className="flex justify-center mb-8">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm"
        >
          <option value="pokedexNumber">Numéro du Pokédex</option>
          <option value="name">Nom</option>
        </select>
      </div>

      {/* Liste des Pokémon */}
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 mb-16 space-x-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            aria-label="Page précédente"
            className={`px-6 py-2 rounded-md transition-all duration-300 ease-in-out ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            Précédent
          </button>

          <span className="text-lg" aria-live="polite">
            Page {currentPage} sur {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            aria-label="Page suivante"
            className={`px-6 py-2 rounded-md transition-all duration-300 ease-in-out ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            Suivant
          </button>
        </div>
      )}
    </MainLayout>
  );
}
