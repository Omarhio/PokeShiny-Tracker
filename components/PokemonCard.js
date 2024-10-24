export default function PokemonCard({ name, pokedexNumber, image, date, region, location, encounters, onDelete }) {
  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105">
      <img
        src={image}
        alt={name}
        className="w-24 h-24 mx-auto mb-4"
      />
      <h2 className="text-center text-xl font-bold">{name}</h2>
      <p className="text-center text-gray-600">N° Pokédex : {pokedexNumber}</p>
      {/* Conteneur pour les détails, caché par défaut */}
      <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col justify-center items-center opacity-0 transition-opacity duration-300 hover:opacity-100 rounded-lg p-4">
        <p className="text-gray-600">Région : {region}</p>
        <p className="text-gray-600">Lieu : {location}</p>
        <p className="text-gray-600">Date : {date}</p>
        <p className="text-gray-600">Rencontres : {encounters}</p>

        {/* Bouton de suppression */}
        <button
          onClick={onDelete}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-200"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}