export type DocumentData = {
    id: string;
    name: string;
    text: string;
    createdAt: Date;
};

export type SummaryData = {
    summary: string;
    citations: {
        page: number;
        paragraph: number;
    }[];
    audience: string;
};
