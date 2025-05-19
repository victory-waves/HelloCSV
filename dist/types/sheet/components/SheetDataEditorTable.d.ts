import { Table } from '@tanstack/react-table';
import { SheetDefinition, SheetRow, SheetState } from '../types';
import { ImporterOutputFieldType, ImporterValidationError } from '../../types';
interface Props {
    table: Table<SheetRow>;
    sheetDefinition: SheetDefinition;
    visibleData: SheetRow[];
    allData: SheetState[];
    sheetValidationErrors: ImporterValidationError[];
    onCellValueChanged: (rowIndex: number, columnId: string, value: ImporterOutputFieldType) => void;
    selectedRows: SheetRow[];
    setSelectedRows: (rows: SheetRow[]) => void;
}
export default function SheetDataEditorTable({ table, sheetDefinition, visibleData, allData, sheetValidationErrors, onCellValueChanged, selectedRows, setSelectedRows, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=SheetDataEditorTable.d.ts.map