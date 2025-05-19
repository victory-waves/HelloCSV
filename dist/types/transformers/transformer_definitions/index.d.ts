import { ImporterTransformerDefinitionBase } from '../types';
import { Transformer } from './base';
export * from './base';
export * from './custom_transformer';
export * from './phone_number_transformer';
export * from './postal_code_transformer';
export * from './state_code_transformer';
export * from './strip_transformer';
export declare function buildTransformerFromDefinition(definition: ImporterTransformerDefinitionBase): Transformer;
//# sourceMappingURL=index.d.ts.map