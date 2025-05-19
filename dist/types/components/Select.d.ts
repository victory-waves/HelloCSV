import { ReactNode } from 'react';
import { ImporterOutputFieldType } from '../types';
export interface SelectOption<T> {
    label: ImporterOutputFieldType;
    value: T;
    icon?: ReactNode;
    group?: string;
}
interface Props<T> {
    value: T[] | T | null;
    options: SelectOption<T>[];
    onChange: (value: T[] | T | null) => void;
    multiple?: boolean;
    compareFunction?: (a: T, b: T) => boolean;
    clearable?: boolean;
    searchable?: boolean;
    placeholder?: string;
    classes?: string;
    displayPlaceholderWhenSelected?: boolean;
}
export default function Select<T>({ value, options, onChange, multiple, compareFunction, clearable, searchable, placeholder, classes, displayPlaceholderWhenSelected, }: Props<T>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Select.d.ts.map