
export type SearchEngineResults = SearchEngineResult[]
export interface SearchEngineResult {
    title: string;
    link: string;
    description: string;
    pubdate: string;
}

export type ProcessedText = {keyword: string, weight: number}[]