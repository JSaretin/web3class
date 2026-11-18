export interface User {
    id: number;
    name: string;
    username: string;
    password: string;
    followsId: number[];
}


export interface Author {
    name: string;
    username: string;
    dateOfBirth: string;
    password: string;
}

export interface Comment {
    id: number;
    description: string;
    author: Author;
}


export interface Blog {
    id: number;
    description: string;
    author: Author;
    likes: number;

    comments: Comment[]
}