// import {FormValidator} from "../validator/form-validator";
// import {AbstractControl, FormControl} from "@angular/forms";
//
// validatorNgClassInput(input: string): string {
//   return FormValidator.validateNgClassInput(this.formSubmitted, (<FormControl>this.formulario.get(input)));
// }
//
// validatorNgClassInputPENDING(input: string): string {
//   return FormValidator.validateNgClassInputPENDING(this.formSubmitted, (<FormControl>this.formulario.get(input)));
// }
//
// validatorNgClassLabel(input: string): string {
//   return FormValidator.validateNgClassLabel(this.formSubmitted, (<FormControl>this.formulario.get(input)))
// }
//
// validatorNgClassSmall(input: string): string {
//   return FormValidator.validateNgClassSmall(<FormControl>this.formulario.get(input))
// }
//
// validatorGenericSmallMessage(input: string, inputName: string,  inputNameEqualsTo?: string): string {
//   return FormValidator.validateGenericSmallMessage(<FormControl> this.formulario.get(input), inputName, inputNameEqualsTo)
// }
//
// validatorLabelValue(input: string, defaultMessage: string): string {
//   return FormValidator.validateInterpolationLabel(this.formSubmitted, (<FormControl>this.formulario.get(input)), defaultMessage)
// }
//
// validatorEmailInvalid(input: string): string {
//   return FormValidator.validateCustomEmailInUse(<FormControl>this.formulario.get(input), 'Campo Inválido');
//   // return FormValidator.validateIsMailInvalidMessage(<FormControl>this.formulario.get(input), 'Campo Inválido');
// }
//
// validatorCepInvalid(input: string): string {
//   return FormValidator.validateCustomIsCepInvalidMessage(<FormControl>this.formulario.get(input), "Campo Inválido")
//   // return this.formValidatorService.validateIsMinLengthMessage(<FormControl>this.formulario.get(input), 'Campo Inválido')
//   // return this.formValidatorService.validateIsMaxLengthMessage(<FormControl>this.formulario.get(input), 'Campo Inválido')
//   // return this.formValidatorService
//   //   .validateIsMinLengthOrMaxLengthMessage(<FormControl>this.formulario.get(input), 'Campo Inválido');
// }
//
// validatorCheckBox(input: string): boolean {
//   return FormValidator.validateIsInputDirtyOrFormSubmittedReactive(this.formSubmitted, (<FormControl>this.formulario.get(input)))
// }
//
// validatorNgClassInputFormArray(input: string, itemFormArray: AbstractControl): string {
//   // console.log(this.telefones.get("0")?.get("numero"))
//   // console.log(itemFormArray.get("numero")?.value)
//   return FormValidator.validateNgClassInputFormArray(input, this.formSubmitted, itemFormArray);
//   // console.log(this.formulario.get("telefones")?.get("0")?.get("numero"))
//   // return this.formValidatorService.validateNgClassInput(this.formSubmitted, (<FormControl>this.formulario.get(formArrayName)?.get(String(index))?.get(input)));
//   // return this.formValidatorService.validateNgClassInput(this.formSubmitted,<FormControl> this.formulario.get(formArrayName).g)
// }
//
// validatorNgClassMinCheckBox(): string {
//   return FormValidator.validateCustomNgClassMinCheckBox(this.formSubmitted, this.linguas);
// }
//
// validatorIsEqualsToMessage(input: string): string {
//   return FormValidator.validateCustomIsEqualsToMessage(<FormControl>this.formulario.get(input), "Campo Inválido")
// }
