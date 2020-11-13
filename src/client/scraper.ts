import { Keyword } from ".";
import { SearchEngineResults, ProcessedText } from "../types";



export async function iterate() {
    
}

export async function removeUnrelevant() {

}

export async function filterRelevant(): Promise<Keyword[]> {
    return []
}

export async function research(keywords: Keyword[]) {
    console.log(`Researching for ${keywords.map(e => e.keyword).join(", ")}`);
    
    
}

export async function apiSearchEngine(query: string): Promise<SearchEngineResults> {
    var res = await fetch(`/api/query?q=${encodeURIComponent(query)}`, {

    })
    var j: SearchEngineResults = await res.json()
    return j
}
export async function apiWebsiteText(query: string): Promise<string> {
    var res = await fetch(`/api/query?q=${encodeURIComponent(query)}`, {

    })
    return await res.text()
}
export function processText(s:string): ProcessedText {
    var lastCase = false
    var textCase = ""
    for (let i = 0; i < s.length; i++) {
        var ch = s.charAt(i)
        var tc = ch.toUpperCase() == ch
        if (lastCase && tc) {
            textCase += " "
        }
        textCase += ch
        lastCase = tc
    }
    var tsplit = textCase.split(" ")
    /*var tfoundbefore = []
    for (let i = 0; i < tsplit.length; i++) {
        const w = tsplit[i];
        if (w == )
    }*/
    
    return []
}