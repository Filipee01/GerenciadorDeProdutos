import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AddProduct from "./pages/AddProduct";
import ProductList from "./pages/ProductList";
import Home from "./pages/Home";

function App() {
  const [products, setProducts] = useState([]);

  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  const removeProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  return (
    <Router>
      <div className="p-6 w-screen h-screen bg-zinc-800">
        <nav className="flex justify-between mb-6">
          <Link
            to="/"
            className="text-blue-500 border-b-2 border-blue-500 p-2 rounded"
          >
            Home
          </Link>
          <Link
            to="/product-list"
            className="text-blue-500 border-b-2 border-blue-500 p-2 rounded"
          >
            Produtos
          </Link>
          <Link
            to="/add"
            className="text-green-500 border-b-2 border-green-500 p-2 rounded"
          >
            Adicionar Produto
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/product-list"
            element={
              <ProductList products={products} removeProduct={removeProduct} />
            }
          />
          <Route path="/add" element={<AddProduct addProduct={addProduct} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
