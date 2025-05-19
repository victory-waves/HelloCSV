import { ImporterValidationError } from './types';
import { SheetColumnDefinition, SheetDefinition, SheetState } from '../types';
export declare function fieldIsRequired(columnDefinition: SheetColumnDefinition): boolean;
export declare function applyValidations(sheetDefinitions: SheetDefinition[], sheetStates: SheetState[]): ImporterValidationError[];
//# sourceMappingURL=index.d.ts.map