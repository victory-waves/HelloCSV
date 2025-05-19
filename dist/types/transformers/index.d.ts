import { ImporterOutputFieldType, SheetDefinition, SheetState } from '../types';
import { Transformer } from './transformer_definitions/base';
export declare function applyTransformations(sheetDefinitions: SheetDefinition[], sheetStates: SheetState[]): SheetState[];
export declare class Pipeline {
    steps: Transformer[];
    constructor(steps?: never[]);
    push(step: Transformer): void;
    transform(value: ImporterOutputFieldType): ImporterOutputFieldType;
}
//# sourceMappingURL=index.d.ts.map