import { CSSProperties, ReactNode } from 'react';
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'success' | 'danger';
interface Props {
    children?: ReactNode;
    variant?: ButtonVariant;
    outline?: boolean;
    disabled?: boolean;
    withFullWidth?: boolean;
    onClick?: () => void;
    style?: CSSProperties;
}
export default function Button({ children, variant, disabled, onClick, withFullWidth, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Button.d.ts.map