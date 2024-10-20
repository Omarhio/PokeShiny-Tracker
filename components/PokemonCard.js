// components/PokemonCard.js
import Image from 'next/image'

const PokemonCard = ({ name, image, date, encounters }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-md">
      <Image src={image} alt={name} width={96} height={96} />
      <h2 className="text-xl font-bold">{name}</h2>
      <p>Date de capture : {date}</p>
      <p>Rencontres : {encounters}</p>
    </div>
  )
}

export default PokemonCard
