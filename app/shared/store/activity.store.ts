import { create } from 'zustand';

type ActivityType = 'Question' | 'WordSearch' | 'MatchingConcepts';

interface ActivityState {
    currentStep: number;
    responses: Record<string, any>[];
    mediaStatus: 'loading' | 'ready' | 'error';
    startTime: number;
    activityType: ActivityType;
    actions: {
        initialize: (steps: number) => void;
        nextStep: () => void;
        prevStep: () => void;
        addResponse: (response: any) => void;
        reset: () => void;
        setActivityType: (type: ActivityType) => void;
        nextActivityType: () => void;
    };
}

const useActivityStore = create<ActivityState>()((set) => ({
    currentStep: 0,
    responses: [],
    mediaStatus: 'loading',
    startTime: Date.now(),
    activityType: 'Question',
    actions: {
        initialize: (steps: number) => set({ currentStep: 0, responses: new Array(steps) }),
        nextStep: () => set((state) => ({
            //currentStep: Math.min(state.currentStep + 1, state.responses.length - 1)
            currentStep: state.currentStep + 1
        })),
        prevStep: () => set((state) => ({
            currentStep: Math.max(state.currentStep - 1, 0)
        })),
        addResponse: (response: any) => set((state) => ({
            responses: [...state.responses, response]
        })),
        reset: () => set({
            currentStep: 0,
            responses: [],
            mediaStatus: 'loading',
            startTime: Date.now(),
            activityType: 'Question'
        }),
        setActivityType: (type: ActivityType) => set({
            activityType: type
        }),
        nextActivityType: () => set((state) => {
            const currentType = state.activityType;
            let nextType: ActivityType = currentType;

            if (currentType === 'Question') {
                nextType = 'WordSearch';
            } else if (currentType === 'WordSearch') {
                nextType = 'MatchingConcepts';
            }

            return { activityType: nextType };
        })
    },
}));

export default useActivityStore;