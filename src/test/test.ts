import { WordFreqDB } from "../server/database"

var db = new WordFreqDB();

(async () => {
	console.log("Testing database stuff")

	await db.init()
	console.log(await db.word_freq("Terror"))
	console.log(await db.add_word("wordthatshouldntalreadybeinthedatabase", 5))
	console.log(await db.add_word("Terror", 1))
	await db.close()
})();
