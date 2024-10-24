import { useState } from 'react';

export default function CaptureForm({ onAddPokemon }) {
  const [name, setName] = useState('');
  const [pokedexNumber, setPokedexNumber] = useState('');
  const [dateCaptured, setDateCaptured] = useState('');
  const [encounters, setEncounters] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newPokemon = {
      name,
      pokedexNumber: parseInt(pokedexNumber),
      dateCaptured,
      encounters: parseInt(encounters),
    };

    onAddPokemon(newPokemon);
    
    setName('');
    setPokedexNumber('');
    setDateCaptured('');
    setEncounters('');
  };

  return (
    <div className="container mx-auto mt-8">
      
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-md shadow-md max-w-lg mx-auto mb-8">
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Nom du Pokémon :</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="w-full px-4 py-2 border border-gray-300 rounded-md" 
            placeholder="Nom du Pokémon"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Numéro du Pokédex :</label>
          <input 
            type="number" 
            value={pokedexNumber} 
            onChange={(e) => setPokedexNumber(e.target.value)} 
            className="w-full px-4 py-2 border border-gray-300 rounded-md" 
            placeholder="Numéro du Pokédex"
            required
          />
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

        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-200">
          Ajouter Pokémon
        </button>
      </form>
    </div>
  );
}
