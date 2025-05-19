import { SheetDefinition } from '../types';
import { ImporterValidationError } from '../../types';
interface Props {
    sheetDefinitions: SheetDefinition[];
    activeSheetId: string;
    onSheetChange: (sheetId: string) => void;
    validationErrors: ImporterValidationError[];
}
export default function SheetsSwitcher({ sheetDefinitions, activeSheetId, onSheetChange, validationErrors, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=SheetsSwitcher.d.ts.map