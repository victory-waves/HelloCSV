import { ImporterValidationError, SheetColumnDefinition, SheetColumnReferenceDefinition, SheetDefinition, SheetRow, SheetState, SheetViewMode } from '../types';
export declare function extractReferenceColumnPossibleValues(columnDefinition: SheetColumnReferenceDefinition, allData: SheetState[]): import('..').ImporterOutputFieldType[];
export declare function downloadSheetAsCsv(sheetDefinition: SheetDefinition, data: SheetRow[]): void;
export declare function findRowIndex(allData: SheetState[], sheetId: string, row: SheetRow): number;
export declare function useFilteredRowData(data: SheetState, allData: SheetState[], viewMode: SheetViewMode, sheetValidationErrors: ImporterValidationError[], errorColumnFilter: string | null, sheetDefinition: SheetDefinition, searchPhrase: string): SheetRow[];
export declare function isColumnReadOnly(columnDefinition: SheetColumnDefinition): boolean;
//# sourceMappingURL=utils.d.ts.map