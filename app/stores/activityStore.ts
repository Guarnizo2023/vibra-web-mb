import { create } from 'zustand';

interface ActivityState {
    currentStep: number;
    responses: Record<string, any>[];
    mediaStatus: 'loading' | 'ready' | 'error';
    startTime: number;
    actions: {
        initialize: (steps: number) => void;
        nextStep: () => void;
        prevStep: () => void;
        addResponse: (response: any) => void;
        reset: () => void;
    };
}

export const useActivityStore = create<ActivityState>()((set) => ({
    currentStep: 0,
    responses: [],
    mediaStatus: 'loading',
    startTime: Date.now(),
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
            startTime: Date.now()
        })
    },
}));

