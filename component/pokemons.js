import Link from 'next/link'
import React from 'react'

export function Pokemons({ pokemons, styles }) {

    const elPokemons = pokemons.map(pk => <Pokemon key={pk.id} styles={styles} pokemon={pk} />);

    return (
        <div className={styles.columnas}>
            <ul>{elPokemons}</ul>
        </div>
    )
}

function Pokemon({ pokemon, styles }) {
    return (
        <li key={pokemon.id}>
            <Link scroll={false} href={`/pokemon/${pokemon.name}`}>
                <PokemonDetail styles={styles} pokemon={pokemon} />
            </Link>
        </li>
    )
}

const PokemonDetail = React.forwardRef(({ onClick, href, pokemon, styles }, ref) => {
    
    return (
        <a href={href} onClick={onClick} ref={ref}>
            <div className={`${styles.card} ${pokemon.types[0].name.toLowerCase()}`}>
                <PokemonTypes styles={styles} pokemon={pokemon}/>
                <img
                    src={pokemon.image__c}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                    className={styles.imagen}
                />
            </div>
        </a>
    )
});

function Types({ types, styles }) {
    return types.map( type => {
        return (
            <div key={type.id} className={styles.tipo}>
                {type.name}
            </div>
        )
    })
}

function PokemonTypes({ styles, pokemon }) {
    return (
        <div className={styles.nombreTipos}>
            <h3 exit={{ opacity: 0 }}>{pokemon.name}</h3>
            <div className={styles.tipos}>
                <Types types={pokemon.types} styles={styles} />
            </div>
        </div>
    )
}