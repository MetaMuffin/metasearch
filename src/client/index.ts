import { DataSet, Network, Node, Edge, Options } from "vis";
import { researchKeywords, iterate, addNewKws } from "./scraper";

export interface Keyword {
    keyword: string
    weight: number
    id: number
}
export interface Link {
    ref: string
    weight: number
    from: number
    to: number
}

export var nodes: DataSet<Node> = new DataSet([]);
export var edges: DataSet<Edge> = new DataSet([]);
export var keywords: Keyword[] = []
export var links: Link[] = []
export var network: Network

window.onload = () => {
    var container = document.getElementById("graph");
    if (!container) throw new Error("KEK");

    var options: Options = {};
    network = new Network(container, { nodes, edges }, options);
    network.on("click",(ev) => {

    })
    network.on("doubleClick",(ev) => {
        if (ev.nodes.length > 0) {
            var idn: number = ev.nodes[0]
            var kw = keywords.find(n => n.id == idn)
            if (!kw) return
            iterate([kw])
        }
    })

    var start = prompt("Research entry point:", "bestlinuxgamers") || "bestlinuxgamers"
    var nkw = {
        id: 0,
        keyword: start,
        weight: 3.0
    }
    addNewKws([],[nkw])
};

