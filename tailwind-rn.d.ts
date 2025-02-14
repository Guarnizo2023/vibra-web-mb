// tailwind-rn.d.ts
import 'tailwind-rn';

declare module 'tailwind-rn' {
    interface TailwindProviderProps {
        children: React.ReactNode;
        utilities: Record<string, { style: Record<string, unknown> }>;
    }

    interface Props {
        children: React.ReactNode;
        utilities: Record<string, { style: Record<string, unknown> }>;
    }

    interface TailwindProvider {
        children: React.ReactNode;
        utilities: Record<string, { style: Record<string, unknown> }>;
    }
}