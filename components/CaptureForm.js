import { useState } from 'react';
import { pokemonList } from '../data/PokemonList';
import { locations } from '../data/locations';
import { routesList } from '../data/routesList';

export default function CaptureForm({ onAddPokemon }) {
  const [name, setName] = useState('');
  const [pokedexNumber, setPokedexNumber] = useState(null);
  const [nameSuggestions, setNameSuggestions] = useState([]);
  const [dateCaptured, setDateCaptured] = useState('');
  const [encounters, setEncounters] = useState('');
  const [region, setRegion] = useState('');
  const [location, setLocation] = useState('');
  const [route, setRoute] = useState(''); // Nouvelle variable pour la route
  const [capturedPokemons, setCapturedPokemons] = useState([]);

  // Autocomplete logic for Pokémon names
  const handleNameChange = (input) => {
    const filteredSuggestions = pokemonList
      .filter((pokemon) =>
        pokemon.name.toLowerCase().includes(input.toLowerCase())
      )
      .slice(0, 10);
    setName(input);
    setNameSuggestions(filteredSuggestions);
  };

  const handleSelectPokemon = (pokemon) => {
    setName(pokemon.name);
    setPokedexNumber(pokemon.pokedexNumber);
    setNameSuggestions([]);
  };

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
    setLocation('');
    setRoute(''); // Reset the route when the region changes
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPokemon = {
      name,
      pokedexNumber,
      dateCaptured,
      encounters: parseInt(encounters),
      region,
      location,
      route, // Ajout de la route au Pokémon capturé
    };

    onAddPokemon(newPokemon);

    setCapturedPokemons([...capturedPokemons, newPokemon]);

    // Reset form
    setName('');
    setPokedexNumber(null);
    setDateCaptured('');
    setEncounters('');
    setRegion('');
    setLocation('');
    setRoute('');
    setNameSuggestions([]);
  };

  return (
    <div className="container mx-auto mt-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-md shadow-md max-w-lg mx-auto mb-8"
      >
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Nom du Pokémon :</label>
          <input
            type="text"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Nom du Pokémon"
            required
          />
          {nameSuggestions.length > 0 && (
            <ul className="border border-gray-300 rounded-md mt-2">
              {nameSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelectPokemon(suggestion)}
                >
                  {suggestion.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Date de capture :</label>
          <input
            type="date"
            value={dateCaptured}
            onChange={(e) => setDateCaptured(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Nombre de rencontres :</label>
          <input
            type="number"
            value={encounters}
            onChange={(e) => setEncounters(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Nombre de rencontres"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Région :</label>
          <select
            value={region}
            onChange={handleRegionChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Sélectionner une région</option>
            <option value="Kanto">Kanto</option>
            <option value="Johto">Johto</option>
            <option value="Hoenn">Hoenn</option>
            <option value="Sinnoh">Sinnoh</option>
            <option value="Unys">Unys</option>
          </select>
        </div>

        {region && (
          <>
            <div className="mb-4">
              <label className="block text-lg font-medium mb-2">Lieu de rencontre :</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Sélectionner un lieu</option>
                {locations[region.toLowerCase()]?.map((loc, index) => (
                  <option key={index} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-lg font-medium mb-2">Route :</label>
              <select
                value={route}
                onChange={(e) => setRoute(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Sélectionner une route</option>
                {routesList[region.toLowerCase()]?.map((route, index) => (
                  <option key={index} value={route.number}>
                    {route.number} ({route.from} - {route.to})
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-200"
        >
          Ajouter Pokémon
        </button>
      </form>
    </div>
  );
}
