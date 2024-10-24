import { useState, useEffect, useCallback } from "react";
import MainLayout from "../layouts/MainLayout";
import PokemonCard from "../components/PokemonCard";
import CaptureForm from "../components/CaptureForm";

export default function Captured() {
  const [capturedPokemons, setCapturedPokemons] = useState([]);

  // Fonction pour récupérer les Pokémon capturés depuis le localStorage
  const loadCapturedPokemons = () => {
    try {
      const savedPokemons =
        JSON.parse(localStorage.getItem("capturedPokemons")) || [];
      return savedPokemons;
    } catch (error) {
      console.error(
        "Erreur lors du chargement des Pokémon depuis le localStorage:",
        error
      );
      return [];
    }
  };

  // Fonction pour sauvegarder les Pokémon capturés dans le localStorage
  const saveCapturedPokemons = (pokemons) => {
    try {
      localStorage.setItem("capturedPokemons", JSON.stringify(pokemons));
    } catch (error) {
      console.error(
        "Erreur lors de la sauvegarde des Pokémon dans le localStorage:",
        error
      );
    }
  };

  // Charger les Pokémon capturés depuis le localStorage au chargement de la page
  useEffect(() => {
    const savedPokemons = loadCapturedPokemons();
    setCapturedPokemons(savedPokemons);
  }, []);

  // Fonction pour ajouter un Pokémon capturé
  const addPokemon = useCallback(
    (newPokemon) => {
      // Vérifier si le Pokémon existe déjà pour éviter les doublons
      const isDuplicate = capturedPokemons.some(
        (pokemon) =>
          pokemon.name.toLowerCase() === newPokemon.name.toLowerCase() &&
          pokemon.dateCaptured === newPokemon.dateCaptured
      );

      if (isDuplicate) {
        alert("Ce Pokémon a déjà été capturé à cette date.");
        return;
      }

      const updatedPokemons = [...capturedPokemons, newPokemon];
      setCapturedPokemons(updatedPokemons);
      saveCapturedPokemons(updatedPokemons);
    },
    [capturedPokemons]
  );

  // Fonction pour supprimer un Pokémon capturé
  const deletePokemon = (index) => {
    const updatedPokemons = capturedPokemons.filter((_, i) => i !== index);
    setCapturedPokemons(updatedPokemons);
    saveCapturedPokemons(updatedPokemons);
  };

  return (
    <MainLayout>
      <h1 className="text-4xl font-bold text-center my-8">
        Mes Pokémon Shiny Capturés
      </h1>

      {/* Formulaire pour ajouter un Pokémon */}
      <div className="mb-8">
        <CaptureForm onAddPokemon={addPokemon} />
      </div>

      {/* Encadrement autour de la liste des Pokémon capturés */}
      <div className="bg-gray-100 p-8 rounded-md shadow-md max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">
          Pokémon Shiny Capturés
        </h2>

        {capturedPokemons.length === 0 ? (
          <p className="text-center text-gray-500">
            Aucun Pokémon capturé pour le moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capturedPokemons.map((pokemon, index) => (
              <PokemonCard
                key={index}
                name={pokemon.name}
                pokedexNumber={pokemon.pokedexNumber}
                image={`/images/pokemon/${pokemon.pokedexNumber}.png`}
                date={pokemon.dateCaptured}
                region={pokemon.region}
                location={pokemon.location}
                encounters={pokemon.encounters}
                onDelete={() => deletePokemon(index)} // Ajout de la fonction de suppression
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
