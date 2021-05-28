import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useRouter } from 'next/router'
import * as Mui from '@material-ui/core'

export default function Home() {

  const router = useRouter()


  return (
    <div className={styles.container}>
      <Head>
        <title>Store</title>
      </Head>

      <main>

        <div className="container">
          <Mui.Button onClick={() => router.push('/listing')} variant="contained" color="primary">Go To Listings</Mui.Button>
          <Mui.Button onClick={() => router.push('/basket')} variant="contained" color="primary">Go To Basket</Mui.Button>
        </div>

      </main>


    </div>
  )
}
