import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [category, setCtgry] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProducts();
  }, []);

  function handleCategory(category) {
    setCtgry(category);
  }

  const filterProducts =
    category === "All"
      ? products
      : products.filter((item) => item.category === category);

  async function getProducts() {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      {isLoading ? (
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <>
          <div className="filter">
            <ul className="items">
              <li onClick={() => handleCategory("All")}>All</li>
              <li onClick={() => handleCategory("men's clothing")}>
                Men's Clothing
              </li>
              <li onClick={() => handleCategory("jewelery")}>Jewelery</li>
              <li onClick={() => handleCategory("electronics")}>Electronics</li>
              <li onClick={() => handleCategory("women's clothing")}>
                Women's Clothing
              </li>
            </ul>
          </div>
          <div className="cards">
            {filterProducts.map((x) => (
              <div key={x.id} className="card">
                <div className="cimg">
                  <img src={x.image} alt={x.title} />
                </div>
                <div className="info">
                  <h5>Title: {x.title}</h5>
                  <p>Price: {x.price}$</p>
                  <p>Description: {x.description.slice(0, 70)}...</p>
                </div>
                <h3>{x.category}</h3>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
