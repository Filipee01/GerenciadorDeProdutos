import PropTypes from "prop-types";
import { X , Printer} from "lucide-react";

const ProductList = ({ schools, removeProduct, removeSchool }) => {
  const formatCurrency = (value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  const calcValue = ({ unitValue, quantity, unitContent = 1 }) => {
    return unitValue * quantity * unitContent;
  };

  const calcSchoolTotal = (products) =>
    products.reduce((acc, product) => acc + calcValue(product), 0);

  const calcGrandTotal = () =>
    schools.reduce((acc, school) => acc + calcSchoolTotal(school.products), 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-lg mx-auto overflow-x-hidden">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Lista de Fornecedores</h2>
        <button
          onClick={handlePrint}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
        <Printer />
        </button>
      </div>
      {schools.map((school, schoolIndex) => (
        <div
          key={schoolIndex}
          className="relative mb-6 p-4 bg-gray-200 rounded shadow w-full overflow-x-hidden"
        >
          <button
            onClick={() => removeSchool(school.name)}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded hover:bg-red-600"
          >
            <X />
          </button>
          <h3 className="font-bold mb-2 text-lg text-blue-500 flex gap-1">
            Fornecedor: <p className="text-black">{school.name}</p>
          </h3>
          <ul className="space-y-2">
            {school.products.map((product, productIndex) => (
              <li
                key={productIndex}
                className="p-4 bg-gray-100 rounded shadow flex flex-col space-y-2"
              >
                <div>
                  <span className="font-bold">Produto:</span> {product.name}
                </div>
                <div>
                  <span className="font-bold">Tipo:</span> {product.type}
                </div>
                <div>
                  <span className="font-bold">Quantidade: </span>
                  {product.quantity} {product.type}
                  {product.quantity > 1 ? "s" : ""}
                </div>
                {product.type !== "UNIDADE" && (
                  <div>
                    <span className="font-bold">
                      Conteúdo por {product.type}:
                    </span>{" "}
                    {product.unitContent}{" "}
                    {product.type === "KG" ? "KG" : "unidades"}
                  </div>
                )}
                <div>
                  <span className="font-bold">Valor Unitário: </span>
                  {formatCurrency(product.unitValue)}
                </div>
                <div>
                  <span className="font-bold">Valor Total: </span>
                  {formatCurrency(calcValue(product))}
                </div>
                <button
                  onClick={() => removeProduct(school.name, productIndex)}
                  className="  bg-red-500 text-white p-1 rounded hover:bg-red-600 mt-2 self-center"
                >
                  Remover produto
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-bold text-black flex gap-1">
            Total:
            <span className="text-emerald-600">
              {formatCurrency(calcSchoolTotal(school.products))}
            </span>
          </p>
        </div>
      ))}
      <p className="font-bold text-xl text-white flex gap-1">
        Total Geral:
        <span className="text-emerald-600">
          {formatCurrency(calcGrandTotal())}
        </span>
      </p>
    </div>
  );
};

ProductList.propTypes = {
  schools: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      products: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired,
          quantity: PropTypes.number.isRequired,
          unitValue: PropTypes.number.isRequired,
          unitContent: PropTypes.number,
        })
      ).isRequired,
    })
  ).isRequired,
  removeProduct: PropTypes.func.isRequired,
  removeSchool: PropTypes.func.isRequired,
};

export default ProductList;
