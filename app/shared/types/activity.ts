export interface Resource {
    type: 'video' | 'audio';
    url: string;
}

interface Question {
    id: string;
    type: 'open' | 'multiple';
    url: string;
    questionText: string;
    _id: string;
    options: []
}

export default Question;