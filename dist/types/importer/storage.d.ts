import { ImporterState } from './types';
import { SheetDefinition } from '../sheet/types';
export declare function getIndexedDBState(sheetDefinitions: SheetDefinition[], customKey?: string | null): Promise<ImporterState | null>;
export declare function setIndexedDBState(state: ImporterState, customKey?: string | null): Promise<void>;
//# sourceMappingURL=storage.d.ts.map