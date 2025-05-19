import { SheetState, ImportStatistics, ImporterMode } from '../../types';
type Mode = Extract<ImporterMode, 'completed'>;
interface Props {
    sheetData: SheetState[];
    statistics?: ImportStatistics;
    mode: Mode;
    rowFile?: File;
    resetState: () => void;
    onSummaryFinished?: () => void;
}
export default function Completed({ sheetData, statistics, mode, rowFile, resetState, onSummaryFinished, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Completed.d.ts.map