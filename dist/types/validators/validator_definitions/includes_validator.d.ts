import { ImporterOutputFieldType, IncludesValidatorDefinition } from '../../types';
import { Validator } from './base';
export declare class IncludesValidator extends Validator {
    values: ImporterOutputFieldType[];
    constructor(definition: IncludesValidatorDefinition);
    isValid(fieldValue: ImporterOutputFieldType): string | undefined;
}
//# sourceMappingURL=includes_validator.d.ts.map