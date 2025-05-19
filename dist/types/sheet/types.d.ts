import { ImporterOutputFieldType, ImporterTransformerDefinition, ImporterValidatorDefinition, SelectOption } from '../types';
export interface SheetDefinition {
    id: string;
    label: string;
    columns: SheetColumnDefinition[];
}
export type SheetColumnDefinition = SheetColumnStringDefinition | SheetColumnNumberDefinition | SheetColumnReferenceDefinition | SheetColumnEnumDefinition | SheetColumnCalculatedDefinition;
interface SheetColumnBaseDefinition {
    id: string;
    label: string;
    suggestedMappingKeywords?: string[];
    isReadOnly?: boolean;
    validators?: ImporterValidatorDefinition[];
    transformers?: ImporterTransformerDefinition[];
}
interface SheetColumnStringDefinition extends SheetColumnBaseDefinition {
    type: 'string';
}
interface SheetColumnNumberDefinition extends SheetColumnBaseDefinition {
    type: 'number';
}
export interface SheetColumnReferenceDefinition extends SheetColumnBaseDefinition {
    type: 'reference';
    typeArguments: {
        sheetId: string;
        sheetColumnId: string;
    };
}
interface SheetColumnEnumDefinition extends SheetColumnBaseDefinition {
    type: 'enum';
    typeArguments: {
        values: SelectOption<string>[];
    };
}
interface SheetColumnCalculatedDefinition extends Omit<SheetColumnBaseDefinition, 'isReadOnly'> {
    type: 'calculated';
    typeArguments: {
        getValue: (row: SheetRow) => ImporterOutputFieldType;
    };
}
export type SheetRow = Record<string, ImporterOutputFieldType>;
export interface SheetState {
    sheetId: string;
    rows: SheetRow[];
}
export type SheetViewMode = 'all' | 'valid' | 'errors';
export {};
//# sourceMappingURL=types.d.ts.map