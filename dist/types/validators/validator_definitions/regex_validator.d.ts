import { ImporterOutputFieldType } from '../../types';
import { RegexValidatorDefinition } from '../types';
import { Validator } from './base';
export declare class RegexValidator extends Validator {
    regexp: RegExp;
    constructor(definition: RegexValidatorDefinition);
    isValid(fieldValue: ImporterOutputFieldType): string | undefined;
}
//# sourceMappingURL=regex_validator.d.ts.map