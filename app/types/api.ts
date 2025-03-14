export interface PaginatedResponse<T> {
    docs: T[];
    total: number;
    page: number;
    limit: number;
    totalDocs: number;
}

export interface ActivityResponse {
    activity: Activity;
    schedule: {
        date: Date;
        status: 'pending' | 'active' | 'completed';
    };
}

export interface ResponseDto {
    questionId: string;
    answer: string;
    responseTime: number;
}