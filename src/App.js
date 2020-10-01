import React from 'react';
import './App.css';
import ProductCard from './components/ProductCard/Container';
import {QueryCache, ReactQueryCacheProvider} from 'react-query'
import NavigationBar from "./components/Navigation/NavigationBar";

const queryCache = new QueryCache()

function App() {
    return (
        <ReactQueryCacheProvider queryCache={queryCache}>
            <NavigationBar/>
            <ProductCard/>
        </ReactQueryCacheProvider>
    );
}

export default App;
