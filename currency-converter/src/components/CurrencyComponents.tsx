export const AmountInput = ({ amount, setAmount }: { amount: string; setAmount: (value: string) => void }) => (
  <div className="mb-4">
    <label htmlFor="amount" className="block text-sm font-medium mb-2">
      Amount
    </label>
    <input
      type="number"
      id="amount"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      className="w-full p-2 rounded-md border border-gray-300 text-black"
      placeholder="Amount"
    />
  </div>
);

export const CurrencySelect = ({
  label,
  selectedCurrency,
  setCurrency,
  currencies,
}: {
  label: string;
  selectedCurrency: string;
  setCurrency: (value: string) => void;
  currencies: string[];
}) => (
  <div className="mb-4">
    <label htmlFor={label} className="block text-sm font-medium mb-2">
      {label}
    </label>
    <select
      id={label}
      value={selectedCurrency}
      onChange={(e) => setCurrency(e.target.value)}
      className="w-full p-2 rounded-md border border-gray-300 text-black"
    >
      <option value="">Select...</option>
      {currencies.map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  </div>
);

export const SwapButton = ({ handleSwap }: { handleSwap: () => void }) => (
  <div className="mb-4 text-center">
    <button
      onClick={handleSwap}
      className="text-black bg-white px-4 py-2 rounded-md font-medium hover:bg-gray-200"
    >
      ↔ Swap
    </button>
  </div>
);

export const ConvertButton = ({ handleConvert }: { handleConvert: () => void }) => (
  <div className="mb-4">
    <button
      onClick={handleConvert}
      className="w-full bg-emerald-700 hover:bg-emerald-800 text-black px-4 py-2 rounded-md font-bold"
    >
      Convert
    </button>
  </div>
);

export const ResultDisplay = ({ result }: { result: string | null }) => (
  <div className="mt-4 text-center">
    <p className="text-lg font-semibold">{result || "Result will appear here"}</p>
  </div>
);