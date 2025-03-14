export interface Resource {
    type: 'video' | 'audio';
    url: string;
}

export interface Question {
    type: 'open' | 'multiple';
    url: string;
    questionText: string;
    _id: string;
    options: []
}