import { SheetDefinition, SheetRow, SheetViewMode } from '../types';
import { ImporterValidationError, RemoveRowsPayload } from '../../types';
interface Props {
    sheetDefinition: SheetDefinition;
    rowData: SheetRow[];
    selectedRows: SheetRow[];
    setSelectedRows: (rows: SheetRow[]) => void;
    viewMode: SheetViewMode;
    setViewMode: (mode: SheetViewMode) => void;
    searchPhrase: string;
    setSearchPhrase: (searchPhrase: string) => void;
    errorColumnFilter: string | null;
    setErrorColumnFilter: (mode: string | null) => void;
    removeRows: (payload: RemoveRowsPayload) => void;
    addEmptyRow: () => void;
    sheetValidationErrors: ImporterValidationError[];
    rowValidationSummary: Record<SheetViewMode, number>;
    resetState: () => void;
}
export default function SheetDataEditorActions({ sheetDefinition, rowData, selectedRows, setSelectedRows, viewMode, setViewMode, searchPhrase, setSearchPhrase, errorColumnFilter, setErrorColumnFilter, removeRows, addEmptyRow, sheetValidationErrors, rowValidationSummary, resetState, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=SheetDataEditorActions.d.ts.map