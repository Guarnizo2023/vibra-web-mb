import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ActivityService } from '../../../services/api';
import { ResponseDto } from '@/types/api';

const useActivities = (page = 1) => {
    return useQuery({
        queryKey: ['activities', page],
        queryFn: () => ActivityService.getActivityHistory(page),
        //keepPreviousData: true,
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
        //getNextPageParam: (lastPage: any) => lastPage.hasNextPage ? lastPage.nextPage : undefined,
        //getPreviousPageParam: (firstPage: any) => firstPage.hasPreviousPage ? firstPage.previousPage : undefined
    }) as unknown as any;
};
export default useActivities;

export const useDailyActivity = () => {
    return useQuery({
        queryKey: ['daily-activity'],
        queryFn: ActivityService.getDailyActivity,
        staleTime: 1000 * 60 * 5 // 5 minutos
    }) as unknown as any;
};

export const useSubmitResponse = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: { activityId: string; userId: string; answers: any }) =>
            ActivityService.submitResponse(data.activityId, data.userId, data.answers),
        onSuccess: () => {
            queryClient.invalidateQueries(['daily-activity'] as any);
            queryClient.invalidateQueries(['rankings'] as any);
        }
    });
};