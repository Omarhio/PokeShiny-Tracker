import Head from 'next/head'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Head>
        <title>PokéShiny Tracker</title>
        <meta name="description" content="Liste des Pokémon shiny capturés" />
      </Head>
      <h1 className="text-4xl font-bold">Bienvenue sur PokéShiny Tracker</h1>
    </div>
  )
}
