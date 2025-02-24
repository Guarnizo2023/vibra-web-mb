import 'tailwind-rn';

declare module 'tailwind-rn' {
    interface TailwindProviderProps {
        utilities: Record<string, { style: Record<string, unknown> }>;
        children: React.ReactNode;
    }

    interface Props {
        children: React.ReactNode;
        utilities: Record<string, { style: Record<string, unknown> }>;
    }

    interface TailwindProvider {
        utilities: Record<string, { style: Record<string, unknown> }>;
        children: React.ReactNode;
    }
}