export default interface Problem {
    id: number;
    contest: string;
    index: string;
    fullName?: string;
    rating: number; 
    tags: string[];
    verdict?: string;
    creationTimeSeconds: number;
}