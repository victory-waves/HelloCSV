import { ImporterOutputFieldType } from '../../types';
import { ImporterTransformerDefinitionBase } from '../types';
export declare class Transformer {
    definition: ImporterTransformerDefinitionBase;
    constructor(definition: ImporterTransformerDefinitionBase);
    transform(value: ImporterOutputFieldType): ImporterOutputFieldType;
    parse(_value: ImporterOutputFieldType): ImporterOutputFieldType | undefined;
}
//# sourceMappingURL=base.d.ts.map