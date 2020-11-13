import { DataSet, Network, Node, Edge, Options } from "vis";
import { research } from "./scraper";

export interface Keyword {
    keyword: string
    weight: number
    id: number
}
export interface Link {
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
    nodes.update([
        {id: 0, label: "A"},
        {id: 1, label: "B"},
        {id: 2, label: "C"},
        {id: 3, label: "D"},
        {id: 4, label: "E"},
    ])
    edges.update([
        {from: 0, to: 1},
        {from: 0, to: 2},
        {from: 2, to: 3},
        {from: 0, to: 4},
    ])

    var options: Options = {};
    network = new Network(container, { nodes, edges }, options);
    network.on("click",(ev) => {

    })
    network.on("doubleClick",(ev) => {
        if (ev.nodes.length > 0) {
            var idn: number = ev.nodes[0]
            var kw = keywords.find(n => n.id == idn)
            if (!kw) return
            research([kw])
        }
    })
};

