import { ImporterOutputFieldType, SheetState } from '../types';
export declare const isUndefinedOrNull: (a: any) => boolean;
export declare const isPresent: (a: any) => boolean;
export declare const filterEmptyRows: (state: SheetState) => import('..').SheetRow[];
export declare const isEmptyCell: (value: any) => boolean;
export declare const removeDuplicates: (array: any[]) => any[];
export declare function normalizeValue(value: ImporterOutputFieldType | undefined | null): string | null;
//# sourceMappingURL=index.d.ts.map