import { Challenge } from "./challenge";

export interface CTF{
    id: number;
    name: string;
    start?: Date;
    end?: Date;
    url?: string;
    challenges: Challenge[];
}