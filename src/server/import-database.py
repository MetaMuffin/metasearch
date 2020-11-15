import sys, os, sqlite3

prefix = os.path.dirname(os.path.realpath(__file__))

print("Opening database at \"" + prefix + "/../../data/db\"...")
db = sqlite3.connect(prefix + "/../../data/db")
reader = open(prefix + "/../../data/eng_news_2016_1M/eng_news_2016_1M-words.txt")
c = db.cursor()

print("Re-creating table...")
c.execute("DROP TABLE IF EXISTS words;")
c.execute("CREATE TABLE words (id int, word varchar(255) UNIQUE, freq int);")

statement_buf = []

n = 0

print("Inserting values (this might take a while)...")
for line in reader:
    tokens = line.split("\t")
    word_id, word, freq = int(tokens[0]), tokens[1].lower(), int(tokens[3])

    statement_buf.append((word_id, word, freq, freq))

    if len(statement_buf) >= 10:
        c.executemany("""
            INSERT INTO words(id, word, freq) VALUES(?, ?, ?)
            ON CONFLICT(word) DO UPDATE SET freq = freq + ?;""", statement_buf)

        statement_buf = []

    n += 1
    if n % 12321 == 0:
        sys.stderr.write("\r%d" % n)

sys.stderr.write("\r%d\n" % n)

db.commit()

reader.close()
db.close()

print("Finished. No errors reported.")
