import PropTypes from "prop-types";

function ProductList({ products, removeProduct }) {
  const total = products.reduce((acc, product) => acc + product.quantity, 0);

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4 text-white">Lista de Produtos</h2>
      <ul className="space-y-2">
        {products.map((product, index) => (
          <li
            key={index}
            className="p-4 bg-gray-100 rounded shadow flex justify-between items-center"
          >
            <div>
              <p>
                <strong>Nome:</strong> {product.name}
              </p>
              <p>
                <strong>Tipo:</strong> {product.type}
              </p>
              <p>
                <strong>Quantidade:</strong> {product.quantity} {product.type}
              </p>
            </div>
            <button
              onClick={() => removeProduct(index)}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-6 p-4 bg-blue-100 rounded">
        <strong>Somatório Total:</strong> {total.toFixed(2)}
      </div>
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  removeProduct: PropTypes.func.isRequired,
};

export default ProductList;
