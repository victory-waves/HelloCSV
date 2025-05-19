import { ImporterMode } from '../../importer/types';
import { ImportStatistics, SheetState } from '../../types';
type Mode = Extract<ImporterMode, 'submit' | 'failed' | 'completed'>;
interface Props {
    progress: number;
    mode: Mode;
    onRetry: () => void;
    onBackToPreview: () => void;
    resetState: () => void;
    sheetData: SheetState[];
    statistics?: ImportStatistics;
    rowFile?: File;
    onSummaryFinished?: () => void;
}
export default function ImportStatus({ progress, mode, sheetData, onRetry, onBackToPreview, resetState, statistics, rowFile, onSummaryFinished, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ImportStatus.d.ts.map