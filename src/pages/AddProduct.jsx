import { useState } from "react";

function AddProduct({ addProduct, addSchool }) {
  const [schoolName, setSchoolName] = useState("");
  const [name, setName] = useState("");
  const [unitValue, setUnitValue] = useState("");
  const [type, setType] = useState("KG");
  const [quantity, setQuantity] = useState("");
  const [schoolSelected, setSchoolSelected] = useState(false);

  const handleSchoolSubmit = (e) => {
    e.preventDefault();
    if (schoolName.trim()) {
      addSchool(schoolName.trim());
      setSchoolSelected(true);
    }
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (!name || !unitValue || !quantity) {
      alert("Preencha todos os campos para adicionar um produto.");
      return;
    }

    if (isNaN(unitValue) || unitValue <= 0) {
      alert("Por favor, insira um valor unitário válido.");
      return;
    }

    if (isNaN(quantity) || quantity <= 0) {
      alert("Por favor, insira uma quantidade válida.");
      return;
    }

    addProduct({
      name,
      unitValue: parseFloat(unitValue),
      type,
      quantity: parseFloat(quantity),
    });
    setName("");
    setType("KG");
    setUnitValue("");
    setQuantity("");
  };

  return (
    <div className="max-w-md mx-auto bg-blue-100 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Adicionar Produto</h2>
      <form onSubmit={handleSchoolSubmit} className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">
            Nome da Escola
          </label>
          <input
            type="text"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Ex: Escola de Aplicação Professor Chaves"
            required
          />
          <button
            type="submit"
            className={`w-full p-2 rounded mt-2 ${
              schoolSelected
                ? "bg-blue-500 text-white"
                : "bg-green-500 text-white"
            }`}
          >
            {schoolSelected
              ? "Escola Selecionada"
              : "Selecionar/Adicionar Escola"}
          </button>
        </div>
      </form>
      <form onSubmit={handleProductSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Nome do Produto
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Ex: Arroz"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tipo</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border rounded p-2"
            required
          >
            <option value="KG">KG</option>
            <option value="Unidade">UNIDADE</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Valor Unitário
          </label>
          <input
            type="number"
            step="0.01"
            value={unitValue}
            onChange={(e) => setUnitValue(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Ex: 5.99"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Quantidade</label>
          <input
            type="number"
            step="0.01"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Ex: 15.00"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Adicionar Produto
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
