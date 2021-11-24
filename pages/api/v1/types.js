import {db} from '../../../lib/db';

export default async function handler(req, res) {

    if (req.method === 'GET') {
        
        //Fetch the all pokemon types
        const {rows:types} = await db.query(`SELECT Name FROM salesforce.type__c GROUP BY Name`) 
        
        res.status(200).json(types);
    } else {
        // Handle any other HTTP method
        res.status(404).send('No Found');
    }
}