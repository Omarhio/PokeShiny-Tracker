// layouts/MainLayout.js
import Header from "../components/shared/Header";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pb-16">
        {children}
      </main>
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; 2024 PokéShiny Tracker</p>
      </footer>
    </div>
  );
}
