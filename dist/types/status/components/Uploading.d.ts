import { ImporterMode } from '../../importer/types';
type Mode = Extract<ImporterMode, 'submit' | 'failed' | 'completed'>;
interface Props {
    progress: number;
    mode: Mode;
    resetState: () => void;
}
export default function Completed({ progress, mode, resetState }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Uploading.d.ts.map