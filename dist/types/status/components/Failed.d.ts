import { SheetState, ImporterMode } from '../../types';
type Mode = Extract<ImporterMode, 'failed'>;
interface Props {
    onRetry: () => void;
    onBackToPreview: () => void;
    rowFile?: File;
    sheetData: SheetState[];
    mode: Mode;
}
export default function Failed({ onRetry, onBackToPreview, rowFile, sheetData, mode, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Failed.d.ts.map