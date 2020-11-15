import sqlite from "sqlite3"
import { Database, open } from "sqlite"

export class Metadb {
	dbcon: Database | null

	constructor() {
		this.dbcon = null
	}

	public async init() {
		this.dbcon = await open({filename: __dirname + "/../../data/db",
								driver: sqlite.Database})
	}

	public async word_freq(word: string) {
		var result = await this.dbcon!.get("SELECT freq FROM words WHERE word = ?;",
									   [word.toLowerCase()])

		return (result ?? {freq: 0}).freq ?? 0
	}

	public async close() {
		await this.dbcon!.close()
	}
}
