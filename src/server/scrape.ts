import { SearchEngineResults } from "../types";
import { load } from "cheerio";
import fetch from "node-fetch"
import {Express} from "express"

var bing = require('nodejs-bing')


export async function searchEngine(query:string): Promise<SearchEngineResults> {
  console.log(`Searching for ${query}`);
  return await bing.web(query)
}
export async function websiteText(url:string): Promise<string> {
  console.log(`Downloading ${url}`);
  
  var res = await fetch(url, {
    headers: {
      "User-Agent": "Edge 12.246 	Windows 10 	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246"
    }
  })
  if (!res.ok) {
    console.log("Failed scraping " + url);
    return ""  
  }
  var $ = load(await res.text())
  var text = $('p,a').text()
  console.log("Done!");
  
  return text
}


export function bindScraper(app:Express) {
  app.get("/api/content",async (req,res) => {
    if (!req.query.url) return res.send("Du KEK 1")
    if (typeof req.query.url != "string") return res.send("Du KEK 3")
    res.send(await websiteText(req.query.url))
  })
  app.get("/api/query",async (req,res) => {
    if (!req.query.q) return res.send("Du KEK 2")
    if (typeof req.query.q != "string") return res.send("Du KEK 4")
    var sres = await searchEngine(req.query.q)
    res.send(JSON.stringify(sres))
  })
  app.get("/api/frequency",async (req,res) => {
    
  })
} 