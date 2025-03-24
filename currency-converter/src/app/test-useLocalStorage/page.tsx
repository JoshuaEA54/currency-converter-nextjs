'use client';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function LocalStorageTest() {
  const [valor, setValor] = useLocalStorage('testKey', '');

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">LocalStorage Test</h2>
      <input
        className="border p-2"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
      />
      <p className="mt-4">Valor guardado: {valor}</p>
    </div>
  );
}
