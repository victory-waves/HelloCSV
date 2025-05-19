import { ReactNode } from 'react';
type Variant = 'error' | 'info';
interface Props {
    variant?: Variant;
    children?: ReactNode;
    tooltipText?: string;
}
export default function SheetTooltip({ variant, children, tooltipText, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=SheetTooltip.d.ts.map