import styles from '../styles/Home.module.css'
import { Filters } from '../component/filters'
import { Pokemons } from '../component/pokemons'
import { request } from '../lib/request'

export default function Home({ pokemons, types }) {

    return (
        <>
            <div className={styles.container}>
                <Filters styles={styles} types={types} />
                <Title styles={styles} />
                <Pokemons styles={styles} pokemons={pokemons} />
            </div>
        </>
    )
}

function Title({ styles }) {
    return (
        <div className={styles.titulo}>
            <h1>Pokemons</h1>
        </div>
    )
}

export async function getServerSideProps(ctx) {

    const req = async (path) => request(`${ctx.req.headers.referer}${path}`);
    const getPokemons = async number => await req(`api/v1/pokemon?page=${number}`);
    const getPokemonTypes = async () => await req(`api/v1/types`);

    return {
        props: {
            pokemons: await getPokemons(0),
            types: await getPokemonTypes()
        }
    }

}
