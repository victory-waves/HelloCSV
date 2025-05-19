import { ImporterMode, ImportStatistics, SheetState } from '../../types';
type Mode = Extract<ImporterMode, 'submit' | 'failed' | 'completed'>;
type Props = {
    sheetData: SheetState[];
    mode: Mode;
    statistics?: ImportStatistics;
    rowFile?: File;
    completedWithErrors?: boolean;
};
export default function SummaryInfo({ sheetData, statistics, rowFile, completedWithErrors, mode, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=SummaryInfo.d.ts.map