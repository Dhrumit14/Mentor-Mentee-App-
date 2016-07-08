export class User {
    constructor (
        public name: string,
        public email: string,
        
        public type: string,

        public username: string,
        public password: string,

        public skills: Array<string>,
        public rates: Array<number>,

        public _id?: string
    ) { }
}
