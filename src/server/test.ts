import { Metadb } from "./database"

var db = new Metadb();

(async () => {
	await db.init()
	console.log(await db.word_freq("Terror"))
	await db.close()
})();
