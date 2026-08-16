export default function NotFound() {
  return (
    <div className="min-h-screen bg-abyss flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-display text-6xl text-chart mb-4">404</h1>
        <p className="text-xl text-mist mb-8">Page not found</p>
        <a href="/" className="inline-block bg-signal text-abyss font-medium px-6 py-2 rounded-sm hover:bg-signal/90 transition-colors">
          Return home
        </a>
      </div>
    </div>
  );
}
