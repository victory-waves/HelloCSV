import { ImporterOutputFieldType, SheetRow } from '../../types';
import { ImporterValidatorDefinitionBase, ImporterValidatorOutput } from '../types';
export declare class Validator {
    definition: ImporterValidatorDefinitionBase;
    constructor(definition: ImporterValidatorDefinitionBase);
    isValid(_fieldValue: ImporterOutputFieldType, _row: SheetRow): ImporterValidatorOutput;
}
//# sourceMappingURL=base.d.ts.map