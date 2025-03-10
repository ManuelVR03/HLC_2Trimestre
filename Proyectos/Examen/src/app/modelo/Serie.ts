import { SerieInterface } from "./SerieInterface";
export class Serie implements SerieInterface {
    constructor(
        public id: number,
        public title: string,
        public genre: string,
        public year: number,
        public seasons: number,
        public rating: number
    ) {
    }
}