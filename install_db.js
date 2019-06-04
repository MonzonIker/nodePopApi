'use strics';

require('dotenv').config();

const conn = require('./lib/connectMongoose');

const agentes = require('./data/agenetes.json').agentes;

const readline = require('readline');

const Agente = require('./models/Agente');

conn.once('open', async () => {

    try{

        const response = await askUser('Seguro que quieres borrar la base de datos?');

        if(response.toLowerCase() !== 'yes') {

            console.log('Poceso abortado');
            process.exit();
        }

        await initAgentes(agentes);

        /**
         * 
         * conn.close();
         * 
         * necesita arreglo
         */

    } catch(err){
        console.log('Error:', err);
        process.exit(1);
    }

});


function  askUser(question){ 

    return new Promise((resolve, reject) => {

        const rl = readline.Interface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(question,
            function(answer){
                rl.close();
                resolve(answer);
            }
        );
    });
}

async function initAgentes(agentes){

    //eliminar los actuales

    const deleted = await Agente.deleteMany();

    console.log(`Eliminados ${deleted.n} agentes.`);

    //cargar nuevos

    const inserted = await Agente.insertMany(agentes);

    console.log(`Inserted ${inserted.length} agentes`)

}