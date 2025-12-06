export default interface Problem {
    id: number;
    name: string;
    index: string;
    fullName?: string;
    rating: number; 
    tags: string[];
    verdict?: string;
    creationTimeSeconds: number;
}