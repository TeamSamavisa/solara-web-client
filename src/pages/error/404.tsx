import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-6xl font-bold text-[var(--solara-600)]">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-800">
        Página não encontrada
      </h2>
      <p className="mt-2 text-gray-600">
        A página que você está procurando não existe.
      </p>
      <Button asChild className="mt-8">
        <Link to="/">Voltar para o Início</Link>
      </Button>
    </div>
  );
}
