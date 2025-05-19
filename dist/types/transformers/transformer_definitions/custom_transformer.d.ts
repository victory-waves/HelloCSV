import { CustomTransformerDefinition, ImporterOutputFieldType } from '../../types';
import { Transformer } from './base';
export declare class CustomTransformer extends Transformer {
    key: string;
    parse: (value: ImporterOutputFieldType) => ImporterOutputFieldType | undefined;
    constructor(definition: CustomTransformerDefinition);
}
//# sourceMappingURL=custom_transformer.d.ts.map