import { SheetDefinition, SheetState } from '../types';
import { CellChangedPayload, ImporterValidationError, RemoveRowsPayload } from '../../types';
interface Props {
    sheetDefinition: SheetDefinition;
    data: SheetState;
    allData: SheetState[];
    sheetValidationErrors: ImporterValidationError[];
    setRowData: (payload: CellChangedPayload) => void;
    removeRows: (payload: RemoveRowsPayload) => void;
    addEmptyRow: () => void;
    resetState: () => void;
}
export default function SheetDataEditor({ sheetDefinition, data, allData, sheetValidationErrors, setRowData, removeRows, addEmptyRow, resetState, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=SheetDataEditor.d.ts.map