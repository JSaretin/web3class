export interface User {
    id: number;
    name: string;
    username: string;
    password: string;
    followsId: number[];
}


export interface Author {
    name: string;
}

export interface Blog {
    id: number;
    description: string;
    author: Author;
}