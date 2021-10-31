import React from 'react'
import Navbar from '../component/Navbar'
import Slider from '../component/Slider'
import Categories from '../component/categories'
import Products from '../component/Products'
const Home = () => {
    return (
        <div>
            < Navbar />
            <Slider />
            <Categories />
            <Products />
        </div>
    )
}

export default Home
