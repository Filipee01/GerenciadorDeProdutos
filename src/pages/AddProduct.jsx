import { useState } from "react";

function AddProduct({ addProduct }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("KG");
  const [quantity, setQuantity] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct({ name, type, quantity: parseFloat(quantity) });
    setName("");
    setType("KG");
    setQuantity(0);
  };

  return (
    <div className="max-w-md mx-auto bg-blue-100 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Adicionar Produto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Nome do Produto
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tipo</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="KG">KG</option>
            <option value="Unidade">Unidade</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Quantidade</label>
          <input
            type="number"
            step="0.01"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Adicionar
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
