import { SheetDefinition } from '../../types';
interface Props {
    sheets: SheetDefinition[];
    onFileUploaded: (file: File) => void;
    onEnterDataManually: () => void;
    allowManualDataEntry?: boolean;
    maxFileSizeInBytes: number;
}
export default function Uploader({ sheets, onFileUploaded, onEnterDataManually, allowManualDataEntry, maxFileSizeInBytes, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Uploader.d.ts.map