import "./App.css";
import Product from "./Product";
import Cart from "./Cart";
import Navbar from "./Contents/Navbar";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";

const initialState = {
  products: [],
  cart: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_PRODUCTS":
      return { ...state, products: action.payload };
    case "ADD_CARTS":
      return {...state, carts : action.payload};
    case "ADD_TO_CART":
      const product = action.payload;
      const existingProduct = state.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  totalPrice: (item.quantity + 1) * item.price,
                }
              : item
          ),
        };
      } else {
        product.quantity = 1;
        product.totalPrice = product.price;
        return { ...state, cart: [...state.cart, product] };
      }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case "INCREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: (item.quantity + 1) * item.price,
              }
            : item
        ),
      };
    case "DECREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === action.payload.id && item.quantity > 1
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                  totalPrice: (item.quantity - 1) * item.price,
                }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const productsResponse = await axios.get("https://dummyjson.com/products", {
          params: {
            page: 1,
            limit: 10000,
          },
        });
        const cartResponse = await axios.get("https://dummyjson.com/carts",{
          params: {
            page: 1,
            limit: 10000,
          },
        })
        const categories = extractUniqueCategories(productsResponse.data.products);
        dispatch({ type: "ADD_PRODUCTS", payload: productsResponse.data.products }
          ,{type:"ADD_CARTS", payload:cartResponse.data.carts}
        );
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Handle error: Show message to user or retry mechanism
      }
    };

    fetchData();
  }, []);

  const extractUniqueCategories = (products) => {
    const uniqueCategories = [...new Set(products.map((product) => product.category))];
    return uniqueCategories;
  };

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const removeProduct = (product) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: product });
  };

  const increaseQuantity = (item) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: item });
  };

  const decreaseQuantity = (item) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: item });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? state.products.filter((product) => product.category === selectedCategory)
    : state.products;

  return (
    <>
      <div>
        <Navbar
          categories={categories}
          onCategoryChange={handleCategoryChange}
          selectedCategory={selectedCategory}
        />
      </div>
      <div className="pc-container">
        {/* Add loading indicator or skeleton screen here if needed */}
        <Product products={filteredProducts} addToCart={addToCart} />
        <Cart
          cart={state.cart}
          removeProduct={removeProduct}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
        />
      </div>
    </>
  );
}

export default App;
