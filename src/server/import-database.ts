import { Database } from "sqlite3";
import { readFileSync } from "fs";
import { join } from "path";


var db = new Database("data/db")
db.serialize(() => {
    
    console.log("Reading file");
    var fc = readFileSync(join(__dirname,"../../data/eng_news_2016_1M/eng_news_2016_1M-words.txt")).toString()
    console.log("splitting to lines");
    var fcsplit = fc.split("\n")
    console.log("splitting to values");
    var fcvalues: [number,string,number][] = fcsplit.map(e => {
        var [eid,ew,ew2,ec] = e.split("\t")
        return [parseInt(eid),ew,parseInt(ec)]
    })
    /*console.log("merging cases");
    fcvalues.forEach((e,i) => {
        if (e[1].toLowerCase() != e[1]) {
            //console.log(`Merging '${e[1]}'`);
            var elower = e[1].toLowerCase()
            var em = fcvalues.find(ef => ef[1] == elower)
            if (!em) return process.stdout.write()
            fcvalues.splice(i,1)
            em[2] += e[2]
        }
    })*/
    console.log("inserting into db");
    db.run("CREATE DATABASE metasearch")
    db.run("USE metasearch")
    db.run(`CREATE TABLE words (
        id int,
        word varchar(255),
        freq int
    );`)
    var counter = 0
    for (const e of fcvalues) {
        db.run(`INSERT INTO words (id,word,freq) VALUES (${e[0].toString()}, ${e[1]}, ${e[2].toString()})`)
        counter++
        if (counter % 10000 == 0) process.stdout.write(".")
    }
    console.log("\nDone!");
    
})
db.close()