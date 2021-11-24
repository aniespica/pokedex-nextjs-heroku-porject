import {db} from '../../../lib/db';

export default async function handler(req, res) {

    if (req.method === 'GET') {
        //Fetch the ${pageNumber} pokemons limit to 20 rows 
        const pageNumber = req.query.page ? parseInt(req.query.page,10) : 0
        const {rows:pokemons} = await db.query(`SELECT * FROM salesforce.pokemon__c LIMIT 20 OFFSET ${pageNumber}`); 
        
        //Fetch the pokemons types and weaknesses
        const pokemonId = pokemons.map(pokemon => pokemon.sfid);
        const {rows:types} = await db.query(`SELECT * FROM salesforce.type__c WHERE pokemon__c = ANY ($1)`,[pokemonId]);
        const {rows:weaknesses} = await db.query(`SELECT * FROM salesforce.weakness__c WHERE pokemon__c = ANY ($1)`,[pokemonId]);
        
        //Group the types by pokemon
        const pokemonType = {}
        types.forEach(type => {
            const pktypes = pokemonType[type.pokemon__c] || [];
            pokemonType[type.pokemon__c] = [...pktypes, type];
        })
        
        //Group the weakness by pokemon
        const pokemonWeakness = {}
        weaknesses.forEach(weakness => {
            const pkWeakness = pokemonWeakness[weakness.pokemon__c] || [];
            pokemonWeakness[weakness.pokemon__c] = [...pkWeakness, weakness];
        })

        //Add the pokemon types and weaknesses 
        const pokemonResult = pokemons.map(pokemon => {
            return {
                ...pokemon,
                types: pokemonType[pokemon.sfid],
                weaknesses: pokemonWeakness[pokemon.sfid]
            }
        })
        
        res.status(200).json(pokemonResult);
    } else {
        // Handle any other HTTP method
        res.status(404).send('No Found');
    }
}