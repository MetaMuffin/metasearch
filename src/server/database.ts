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

	public async word_freq(word: string): Promise<number> {
		var result = await this.dbcon!.get("SELECT freq FROM words WHERE word = ?;",
									   [word.toLowerCase()])

		return result?.freq || 0;
	}

	public async add_word(word: string, freq: number): Promise<boolean> {
		try {
			return (await this.dbcon!.run("INSERT INTO words(word, freq) VALUES(?, ?);",
										   [word.toLowerCase(), freq])).changes == 1
		}
		catch (x) {
			return false
		}
	}

	public async close() {
		await this.dbcon!.close()
	}
}
