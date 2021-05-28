import React, { useState, useEffect } from 'react'
import * as Mui from '@material-ui/core'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'


const config = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "X-Requested-With": "XMLHttpRequest",
    }
};

export default function Listing(options) {
    const [products, setProducts] = useState([]);
    const [added, setAdded] = useState(false);
    const [removed, setRemoved] = useState(false);
    const [counter, setCounter] = useState([]);
    const [increment, setIncrement] = useState(0);

    const router = useRouter()

    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
        },
    }));



    const handleClick = (value) => {
        if (value === 'add') setAdded(true);
        else setRemoved(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAdded(false);
        setRemoved(false);
    };

    useEffect(() => {
        getAll();
    }, [added, removed])

    function getAll() {
        axios.get('https://teodor-osyx280w3ewf.runkit.sh/products', config)
            .then(response => setProducts(response.data))
            .then(() => getCounter());
    }

    function getCounter() {
        axios.get('https://teodor-osyx280w3ewf.runkit.sh/basket', config)
            .then(response => setCounter(response.data.items.map((res) => (res.id))));
    }

    function add(product, add) {

        //how many times is added 
        setIncrement(increment + 1);

        if (counter.includes(product.id)) {
            // alert("It's already added")

            axios.patch(`https://cors-anywhere.herokuapp.com/https://teodor-osyx280w3ewf.runkit.sh/basket/${product.id}/increase`, config)
                .then((response) => {
                    console.log(response);
                    // setCounter([...counter, product.id]);

                }, (error) => {
                    console.log(error);
                });
            handleClick(add);


        } else {
            axios.post(`https://teodor-osyx280w3ewf.runkit.sh/basket/${product.id}`, config)
                .then((response) => {
                    console.log(response);
                    // setCounter([...counter, product.id]);

                }, (error) => {
                    console.log(error);
                });
            handleClick(add);
        }
    }

    function fff() {
        console.log(counter)
    }

    function remove(product, remove) {
        const newList = counter.filter((counter) => (counter !== product.id));

        if (counter.includes(product.id) && counter.includes(product.id) > 1) {

            axios.patch(`https://cors-anywhere.herokuapp.com/https://teodor-osyx280w3ewf.runkit.sh/basket/${product.id}/decrease`, config)
                .then((response) => {
                    console.log(response);
                    setCounter(newList);

                }, (error) => {
                    console.log(error);
                });
            handleClick(remove);

        }

        if (counter.includes(product.id) && counter.includes(product.id) == "1") {

            axios.delete(`https://cors-anywhere.herokuapp.com/https://teodor-osyx280w3ewf.runkit.sh/basket/${product.id}`, config)
                .then((response) => {
                    console.log(response);
                    setCounter(newList);

                }, (error) => {
                    console.log(error);
                });
            handleClick(remove);

        }

        else {
            alert("This item is not in your bag!")
        }
    }

    return (
        <div className="container" style={{ margin: '0 auto' }}>

            <h1 className="text-center">Products listing</h1>
            {/* <button onClick={fff}>bbbbb</button> */}

            <Mui.Button onClick={() => router.push('/basket')} variant="contained" color="primary">Go To Basket</Mui.Button>

            <Mui.Snackbar open={added} autoHideDuration={1000} onClose={handleClose} >
                <div className="msg">Succesfully added!</div>
            </Mui.Snackbar>
            <Mui.Snackbar open={removed} autoHideDuration={1000} onClose={handleClose} >
                <div className="msgr">Removed successfully!</div>
            </Mui.Snackbar>

            <p className="p-5 mx-auto text-center">Added (counter): {increment}</p>

            <div className="flex-wrapper pt-5">

                {products.map((product, index) => (
                    <div key={index}>
                        <p>{product.name}</p>
                        <p className="fs10">Material: {product.material}</p>
                        <p style={{ height: '70px' }} className="fs10">Description: {product.description}</p>
                        <p className="price">Price{product.price}</p>
                        <span><Mui.Button variant="outlined" color="primary" onClick={(e) => add(product, 'add')}>Add</Mui.Button><Mui.Button variant="outlined" color="secondary" onClick={(e) => remove(product, 'remove')}>Remove</Mui.Button></span>
                    </div>
                ))}

            </div>
        </div>
    )
}































      // fetch(`https://cors-anywhere.herokuapp.com/https://teodor-osyx280w3ewf.runkit.sh/basket/${e.id}`, {
        //     method: 'POST', // or 'PUT'
        //     crossDomain: true,
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //         "X-Requested-With": "XMLHttpRequest",
        //     },
        //     body: JSON.stringify(e),
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log('Success:', data);
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });

        // const Card = ({ product, index }) => (
        //     <div key={index}>
        //         <p>{product.name}</p>
        //         <p className="fs10">Material: {product.material}</p>
        //         <p style={{ height: '70px' }} className="fs10">Description: {product.description}</p>
        //         <p className="price">Price{product.price}</p>
        //         <span><Mui.Button variant="outlined" color="primary" onClick={(e) => add(product, 'add')}>Add</Mui.Button><Mui.Button variant="outlined" color="secondary" onClick={(e) => remove(product, 'remove')}>Remove</Mui.Button></span>
        //     </div>
        // )