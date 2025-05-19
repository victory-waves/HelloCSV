import { ImporterMode, ImportStatistics, SheetState } from '../../types';
type Mode = Extract<ImporterMode, 'failed' | 'completed'>;
interface Props {
    mode: Mode;
    sheetData: SheetState[];
    statistics?: ImportStatistics;
    rowFile?: File;
    completedWithErrors?: boolean;
}
export default function Summary({ mode, sheetData, statistics, rowFile, completedWithErrors, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Summary.d.ts.map