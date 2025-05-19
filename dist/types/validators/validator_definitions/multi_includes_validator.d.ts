import { ImporterOutputFieldType, MultiIncludesValidatorDefinition } from '../../types';
import { Validator } from './base';
export declare class MultiIncludesValidator extends Validator {
    delimiter: string | RegExp;
    values: ImporterOutputFieldType[];
    constructor(definition: MultiIncludesValidatorDefinition);
    isValid(fieldValue: ImporterOutputFieldType): string | undefined;
}
//# sourceMappingURL=multi_includes_validator.d.ts.map