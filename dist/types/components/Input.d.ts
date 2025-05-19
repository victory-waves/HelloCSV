import { ReactNode } from 'react';
import { ImporterOutputFieldType } from '../types';
interface Props {
    value: ImporterOutputFieldType;
    onBlur?: (value: ImporterOutputFieldType) => void;
    onChange?: (value: ImporterOutputFieldType) => void;
    placeholder?: string;
    iconBuilder?: (props: Record<string, string>) => ReactNode;
    classes?: string;
    clearable?: boolean;
    type?: 'text' | 'number';
}
declare const Input: import('react').ForwardRefExoticComponent<Props & import('react').RefAttributes<HTMLInputElement>>;
export default Input;
//# sourceMappingURL=Input.d.ts.map