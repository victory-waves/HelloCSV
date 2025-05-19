import { ColumnMapping, CSVParsedData, MapperOptionValue, SheetDefinition } from '../types';
export declare const buildSuggestedHeaderMappings: (sheetDefinitions: SheetDefinition[], csvHeaders: string[]) => ColumnMapping[];
export declare function calculateNewMappingsForCsvColumnMapingChanged(currentMapping: ColumnMapping[], csvColumnName: string, newCsvColumnMaping: MapperOptionValue | null): ColumnMapping[];
export declare function calculateMappingExamples(data: CSVParsedData[], csvColumnName: string): string[];
export declare function useMappingAvailableSelectOptions(sheetDefinitions: SheetDefinition[], currentMapping: ColumnMapping[]): {
    label: string;
    value: {
        sheetId: string;
        sheetColumnId: string;
    };
    group: string;
}[];
export declare function areAllRequiredMappingsSet(sheetDefinitions: SheetDefinition[], mappings: ColumnMapping[]): boolean;
//# sourceMappingURL=utils.d.ts.map