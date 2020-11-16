import { Keyword, keywords, nodes, edges } from ".";
import { SearchEngineResults, ProcessedText } from "../types";

export async function iterate(kws:Keyword[]) {
    await removeUnrelevant()
    for (const kw of kws) {
        var rel = await getRelKeywordsTo(kw)
        for (const relkws of rel) {
            var nkws = await researchKeywords(relkws)
            await addNewKws(relkws,nkws)
        }
    }
}

export async function addNewKws(origins: Keyword[], kws:Keyword[]) {
    kws.forEach(kw => {
        keywords.push(kw)
        nodes.update({
            id: kw.id,
            label: kw.keyword
        })
        origins.forEach(okw => {
            edges.update({
                id: newID(),
                from: okw.id,
                to: kw.id
            })
        })
    })
}

export async function removeUnrelevant() {
    const treshold = 0.5
    for (const n of keywords) {
        if (n.weight < treshold) {
            var [nr] = keywords.splice(keywords.indexOf(n), 1)
            nodes.remove(nr.id)
        }
    }
}

export async function getRelKeywordsTo(kw: Keyword): Promise<Keyword[][]> {
    /*var randomkw = () => keywords[Math.floor(Math.random() * keywords.length)]
    return [
        [ kw, randomkw() ],
    ].map(e => [... new Set(e)])*/
    return [[kw]]
}

export async function researchKeywords(keywords: Keyword[]): Promise<Keyword[]> {
    
    console.log(`Researching for ${keywords.map((e) => e.keyword).join(", ")}`);
    var query = keywords.map(e => e.keyword).join(" ")
    var res = await apiSearchEngine(query)
    var reqsPending = res.slice(0, 1).map(async (r) => {
        var pageContent = await apiWebsiteText(r.link)
        var processed = await processText(pageContent)
        return processed
    })
    var reqsResolved = await Promise.all(reqsPending)
    console.log(reqsResolved);
    return reqsResolved.reduce((a, e) => {
        a.push(...e)
        return a
    }, [])
}

export async function apiSearchEngine(query: string): Promise<SearchEngineResults> {
    var res = await fetch(`/api/query?q=${encodeURIComponent(query)}`, {});
    var j: SearchEngineResults = await res.json();
    return j;
}

export async function apiWebsiteText(url: string): Promise<string> {
    var res = await fetch(`/api/content?url=${encodeURIComponent(url)}`, {});
    return await res.text();
}

export async function processText(s: string): Promise<Keyword[]> {
    var lastCase = false;
    var textCase = "";
    for (let i = 0; i < s.length; i++) {
        var ch = s.charAt(i);
        var tc = ch.toUpperCase() == ch;
        if ((!lastCase) && tc) {
            textCase += " ";
        }
        textCase += ch;
        lastCase = tc;
    }
    var tsplit = textCase.split(" ").map(e => e.trim());
    var tunique = [...new Set(tsplit)];
    var ret = tunique.map((e) => ({ keyword: e, weight: 1, id: newID() }));
    return ret.slice(0,25)
}

var idcounter = 1
export function newID(): number {
    idcounter += 1
    return idcounter
}

