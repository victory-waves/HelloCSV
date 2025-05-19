import { ImporterOutputFieldType } from '../../types';
import { ImporterValidatorDefinitionBase } from '../types';
import { Validator } from './base';
export declare class UniqueValidator extends Validator {
    seen: {
        [key: string]: boolean;
    };
    constructor(definition: ImporterValidatorDefinitionBase);
    isValid(fieldValue: ImporterOutputFieldType): string | undefined;
}
//# sourceMappingURL=unique_validator.d.ts.map