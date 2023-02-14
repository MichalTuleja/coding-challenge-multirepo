
import { PokeModule } from '../src/poke.module.js'

import { NestFactory } from '@nestjs/core';

// // import { PokeService } from '../src/poke.service.js'

// const seed = async (filePath) => {
// 	console.log(app.PokeService);

// 	const app = await NestFactory.create(PokeModule);

// 	const pokeRepository = new app.PokeService();
// 	fs.createReadStream(filePath)
// 		.pipe(parse({ headers: true }))
// 		.on('error', error => console.error(error))
// 		.on('data', row => {
// 			// PokeModule.PokeService.save(row);
// 			// console.log(`ROW=${JSON.stringify(row)}`);
// 		})
// 		.on('end', rowCount => console.log(`Parsed ${rowCount} rows`));
// };

// (async () => {
// 	const file = 'czr_pokemon_db.csv';
// 	await seed(file);
// })();

async function bootstrap() {
	NestFactory.createApplicationContext(PokeModule)
	  .then(appContext => {
		// const logger = appContext.get(Logger);
		// const seeder = appContext.get(Seeder);
		
		const svc = appContext.get(PokeService);

		// seeder
		//   .seed()
		//   .then(() => {
		// 	logger.debug('Seeding complete!');
		//   })
		//   .catch(error => {
		// 	logger.error('Seeding failed!');
		// 	throw error;
		//   })
		//   .finally(() => appContext.close());
	  })
	  .catch(error => {
		throw error;
	  });
  }
  bootstrap();