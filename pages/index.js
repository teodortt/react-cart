import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Home() {

  const initialFormState = { id: null, name: '', slug: '', material: '', color: '', description: '', price: '', currency: '', image: '' }
  const [product, setProduct] = useState(initialFormState)

  const handleInputChange = event => {
    const { name, value } = event.target

    setProduct({ ...product, [name]: value })
  }

  function onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };

    fetch('http://localhost:5000/exercises/add', {
      method: "POST",
      body: JSON.stringify(exercise),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(result => {
        // do something with the result
        console.log("Completed with result:", result);
      });

    console.log(exercise);

    // window.location = '/';
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Store</title>
      </Head>

      <main>



      </main>


    </div>
  )
}
