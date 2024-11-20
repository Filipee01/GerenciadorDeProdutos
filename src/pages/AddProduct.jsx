import { useState } from "react";

function AddProduct({ addProduct, addSchool }) {
  const [schoolName, setSchoolName] = useState("");
  const [name, setName] = useState("");
  const [unitValue, setUnitValue] = useState("");
  const [type, setType] = useState("KG");
  const [quantity, setQuantity] = useState("");
  const [unitContent, setUnitContent] = useState(""); // Novo campo
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

    if (
      (type === "Fardo" || type === "Pack") &&
      (!unitContent || unitContent <= 0)
    ) {
      alert("Por favor, insira o conteúdo por unidade para Fardo ou Pack.");
      return;
    }

    addProduct({
      name,
      unitValue: parseFloat(unitValue),
      type,
      quantity: parseFloat(quantity),
      unitContent:
        type === "Fardo" || type === "Pack" ? parseFloat(unitContent) : 1, // Adiciona o conteúdo por unidade
    });

    setName("");
    setType("KG");
    setUnitValue("");
    setQuantity("");
    setUnitContent(""); // Reseta o campo adicional
  };

  return (
    <div className="max-w-md mx-auto bg-blue-100 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Adicionar Produto</h2>
      <form onSubmit={handleSchoolSubmit} className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">
            Nome do Fornecedor
          </label>
          <input
            type="text"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Ex: Coca-cola"
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
              ? "Fornecedor Selecionado"
              : "Selecionar/Adicionar Fornecedor"}
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
            placeholder="Ex: Sprite"
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
            <option value="Fardo">FARDO</option>
            <option value="Pack">PACK</option>
          </select>
        </div>
        {["Fardo", "Pack"].includes(type) && ( // Mostra o campo apenas para Fardo ou Pack
          <div>
            <label className="block text-sm font-medium mb-1">
              Conteúdo por Unidade ({type})
            </label>
            <input
              type="number"
              step="1"
              value={unitContent}
              onChange={(e) => setUnitContent(e.target.value)}
              className="w-full border rounded p-2"
              placeholder="Ex: 12"
              required
            />
          </div>
        )}
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
