import { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import PokemonCard from '../components/PokemonCard';
import CaptureForm from '../components/CaptureForm';

export default function Captured() {
  const [capturedPokemons, setCapturedPokemons] = useState([]);

  // Charger les Pokémon capturés depuis le localStorage au chargement de la page
  useEffect(() => {
    const savedPokemons = JSON.parse(localStorage.getItem('capturedPokemons')) || [];
    setCapturedPokemons(savedPokemons);
  }, []);

  // Fonction pour ajouter un Pokémon capturé
  const addPokemon = (newPokemon) => {
    const updatedPokemons = [...capturedPokemons, newPokemon];
    setCapturedPokemons(updatedPokemons);
    localStorage.setItem('capturedPokemons', JSON.stringify(updatedPokemons));
  };

  return (
    <MainLayout>
      <h1 className="text-4xl font-bold text-center my-8">Mes Pokémon Shiny Capturés</h1>
      
      {/* Formulaire pour ajouter un Pokémon */}
      <div className="mb-8">
        <CaptureForm onAddPokemon={addPokemon} />
      </div>

      {/* Affichage des Pokémon capturés */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 container mx-auto">
        {capturedPokemons.length > 0 ? (
          capturedPokemons.map((pokemon, index) => (
            <PokemonCard
              key={index}
              name={pokemon.name}
              pokedexNumber={pokemon.pokedexNumber}
              image={`/images/pokemon/${pokemon.pokedexNumber}.png`}
              date={pokemon.dateCaptured}
              encounters={pokemon.encounters}
            />
          ))
        ) : (
          <p className="text-center">Aucun Pokémon shiny capturé pour le moment.</p>
        )}
      </div>
    </MainLayout>
  );
}
