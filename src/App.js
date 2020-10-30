import React from 'react';
import './App.css';
import ProductCard from './components/ProductList/Container';
import NavigationBar from "./components/Navigation/NavigationBar";
import { BrowserRouter, Route } from "react-router-dom";
import Product from "./components/Product/Product";

function App() {
    return (
        <BrowserRouter>
            <NavigationBar/>
            <Route exact path={'/'}>
                <ProductCard/>
            </Route>
            <Route path={'/:productId'}>
                <Product/>
            </Route>
        </BrowserRouter>
    );
}

export default App;
