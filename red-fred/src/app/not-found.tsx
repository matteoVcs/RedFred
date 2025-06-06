import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-bold mb-4">404 - Page non trouvée</h1>
      <p className="text-muted-foreground mb-6">La page que vous cherchez n'existe pas.</p>
      <Link href="/" className="text-blue-600 hover:underline">
        Revenir à l’accueil
      </Link>
    </div>
  );
}