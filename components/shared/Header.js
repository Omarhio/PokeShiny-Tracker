// components/shared/Header.js
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header() {
  const router = useRouter()

  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between">
        <div className="text-xl font-bold">PokéShiny Tracker</div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className={router.pathname === '/' ? 'underline' : ''}>
              Accueil
            </Link>
          </li>
          <li>
            <Link href="/pokelist" className={router.pathname === '/pokelist' ? 'underline' : ''}>
            PokeList
            </Link>
          </li>
          <li>
          <Link href="/captured" className={router.pathname === '/captured' ? 'underline' : ''}>
            Capture
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
