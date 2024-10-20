import Image from 'next/image'

const PokemonCard = ({ name, pokedexNumber, image }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105">
      <div className="flex justify-center">
        <Image src={image} alt={name} width={96} height={96} loading="lazy" className="mb-4" />
      </div>
      <h2 className="text-xl font-bold text-center mb-2">{name}</h2>
      <p className="text-center text-gray-600">N° Pokédex : {pokedexNumber}</p>
    </div>
  )
}

export default PokemonCard
