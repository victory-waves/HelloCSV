import { CustomValidatorDefinition, ImporterOutputFieldType, ImporterValidatorOutput, SheetRow } from '../../types';
import { Validator } from './base';
export declare class CustomValidator extends Validator {
    key?: string;
    validateFn: (fieldValue: ImporterOutputFieldType, row: SheetRow) => ImporterValidatorOutput;
    constructor(definition: CustomValidatorDefinition);
    isValid(fieldValue: ImporterOutputFieldType, row: SheetRow): ImporterValidatorOutput;
}
//# sourceMappingURL=custom_validator.d.ts.map