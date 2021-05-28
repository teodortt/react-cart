import React, { useState, useEffect } from 'react'
import * as Mui from '@material-ui/core'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Basket(options) {
    const [basket, setBasket] = useState([]);
    const [products, setProducts] = useState([]);

    const router = useRouter()

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "X-Requested-With": "XMLHttpRequest",
        }
    };

    const basketList = () => {

        axios.get(`https://cors-anywhere.herokuapp.com/https://teodor-osyx280w3ewf.runkit.sh/basket`, config)
            .then((response) => {
                setBasket(response.data);
            }, (error) => {
                console.log(error);
            });
    }

    const productList = () => {
        // console.log(e)

        axios.get(`https://cors-anywhere.herokuapp.com/https://teodor-osyx280w3ewf.runkit.sh/products`, config)
            .then((response) => {
                setProducts(response.data);
            }, (error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        setTimeout(productList(), 2000);
        basketList();
    }, []);

    return (
        <div className="container-fluid text-center border" style={{ minHeight: '100vh' }}>

            <div className="bg-danger mx-auto p-5 m-5 border rounded w-75">

                <h1 className="text-center pb-5">Basket</h1>

                <p>All items: {products.length}</p>
                <p>Items: {basket.numOfItems}</p>

                <Mui.Button onClick={() => router.push('/listing')} variant="contained" color="primary">Go To Listings</Mui.Button>

                <div className="flex-wrapper pt-5">

                    {basket.items && basket.items.map((count, index) => (
                        <div key={index}>{count.name}</div>
                    ))}

                </div>
            </div>


        </div>

    )
}