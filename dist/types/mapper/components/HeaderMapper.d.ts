import { ColumnMapping, ParsedFile, SheetDefinition } from '../../types';
interface Props {
    parsed: ParsedFile;
    sheetDefinitions: SheetDefinition[];
    currentMapping: ColumnMapping[];
    onMappingsChanged: (mappings: ColumnMapping[]) => void;
    onMappingsSet: () => void;
    onBack: () => void;
}
export default function HeaderMapper({ parsed, sheetDefinitions, currentMapping, onMappingsChanged, onMappingsSet, onBack, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=HeaderMapper.d.ts.map