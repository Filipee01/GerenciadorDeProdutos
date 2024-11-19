import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AddProduct from "./pages/AddProduct";
import ProductList from "./pages/ProductList";
import Home from "./pages/Home";

function App() {
  const [schools, setSchools] = useState(() => {
    try {
      const savedSchools = localStorage.getItem("schools");
      if (savedSchools) {
        return JSON.parse(savedSchools);
      }
    } catch (error) {
      console.error("Erro:", error);
    }
    return [];
  });

  const [currentSchool, setCurrentSchool] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem("schools", JSON.stringify(schools));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  }, [schools]);

  const addSchool = (schoolName) => {
    if (!schools.some((school) => school.name === schoolName)) {
      setSchools([...schools, { name: schoolName, products: [] }]);
    }
    setCurrentSchool(schoolName);
  };

  const addProduct = (product) => {
    setSchools((prevSchools) =>
      prevSchools.map((school) =>
        school.name === currentSchool
          ? { ...school, products: [...school.products, product] }
          : school
      )
    );
  };

  const removeProduct = (schoolName, productIndex) => {
    setSchools((prevSchools) =>
      prevSchools.map((school) =>
        school.name === schoolName
          ? {
              ...school,
              products: school.products.filter((_, i) => i !== productIndex),
            }
          : school
      )
    );
  };

  const removeSchool = (schoolName) => {
    setSchools((prevSchools) =>
      prevSchools.filter((school) => school.name !== schoolName)
    );
  };

  return (
    <Router>
      <div className="p-6 w-screen min-h-screen bg-zinc-800">
        <nav className="flex justify-start gap-2 mb-6">
          <Link
            to="/"
            className="text-white bg-blue-500 p-2 rounded hover:bg-blue-600"
          >
            Início
          </Link>
          <Link
            to="/product-list"
            className="text-white bg-blue-500 p-2 rounded hover:bg-blue-600"
          >
            Produtos
          </Link>
          <Link
            to="/add"
            className="text-white bg-green-500 p-2 rounded hover:bg-green-600"
          >
            Adicionar Produto
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/product-list"
            element={
              <ProductList
                schools={schools}
                removeProduct={removeProduct}
                removeSchool={removeSchool}
              />
            }
          />
          <Route
            path="/add"
            element={
              <AddProduct addProduct={addProduct} addSchool={addSchool} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
