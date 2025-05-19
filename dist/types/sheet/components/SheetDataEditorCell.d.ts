import { ImporterOutputFieldType, SheetColumnDefinition, SheetState } from '../../types';
interface Props {
    columnDefinition: SheetColumnDefinition;
    value: ImporterOutputFieldType;
    onUpdated: (value: ImporterOutputFieldType) => void;
    allData: SheetState[];
    clearRowsSelection: () => void;
    errorsText: string;
}
export default function SheetDataEditorCell({ columnDefinition, value, onUpdated, allData, clearRowsSelection, errorsText, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=SheetDataEditorCell.d.ts.map