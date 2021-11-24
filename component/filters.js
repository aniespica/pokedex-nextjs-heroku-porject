export function Filters({ styles, types }) {
    
    return (
        <div className={styles.filtros}>
            <ButtonClear styles={styles} />
            <ButtonFilters styles={styles} types={types}/>
        </div>
    )
}

function ButtonClear({ styles }) {
    return (
        <button className={`${styles.botonFiltro} ${styles.botonTodos}`} onClick={() => null}>
            Mostrar todos
        </button>
    );
}

function ButtonFilters({ styles, types }) {

    const elTypes = types.map(type => {
        return (
            <button key={type.name} className={`${styles.botonFiltro} ${type.name.toLowerCase()}`} aria-label={type.name} onClick={() => null}>
                {type.name}
            </button>
        )
    })

    return (
        <div className={styles.botones}>
            {elTypes}
        </div>
    )
}