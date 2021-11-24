import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home(props) {
  
  return (
    <>
      <ul className={styles.container}>
        Hola Mundo
      </ul>
    </>
  )
}

export async function getServerSideProps(ctx) {

  const getPokemons = async number => {

    try {
      const json = await fetch(`${ctx.req.headers.referer}api/v1/pokemon?page=${number}`);
      console.log('json => ',json);
      if (!json.ok) {
        const message = `An error has occured: ${json.status}`;
        throw new Error(message);
      }

      const data = await json.json();
      
      return data;
    } catch (error) {
      console.error(error);
    }

  }
  const result = await getPokemons(0);

  return {
    props: result
  }

}
