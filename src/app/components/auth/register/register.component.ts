import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FormValidator} from "../../../shared/validator/form-validator";
import {BuscarEnderecoService} from "../../../shared/service/buscar-endereco.service";
import {Usuario} from "../../../shared/model/Usuario";
import {UsuarioService} from "../../../shared/service/usuario.service";
import {Subscription} from "rxjs";
import {ToastMessageService} from "../../../shared/external/ngx-toastr/toast-message.service";
import {Router} from "@angular/router";
import {HttpValidator} from "../../../shared/validator/http-validator";
import {AuthService} from "../../../shared/service/auth.service";
import {Location} from "@angular/common";
import {Telefone} from "../../../shared/model/Telefone";
import {TelefoneService} from "../../../shared/service/telefone.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../../../assets/css/register.min.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  formulario!: FormGroup;
  formularioAddTelefone!: FormGroup;
  formularioSubmitted: boolean = false;
  formularioAddTelefoneSubmitted: boolean = false;
  @Input() isEditPage: boolean = false;
  usuario?: Usuario = new Usuario();
  titulo: string = "Cadastre-se";
  btnSubmitValue: string = "Cadastrar";
  inscricao: Subscription[] = [];
  locationHref!: Location;

  constructor(
    private fb: FormBuilder,
    private buscarEndereco: BuscarEnderecoService,
    private usuarioService: UsuarioService,
    private toastMessage: ToastMessageService,
    private router: Router,
    private authService: AuthService,
    private location: Location,
    private telefoneService: TelefoneService) { this.locationHref = location }

  ngOnInit(): void {
    this.generateForm();
    this.loadEditPage();
  }


  public generateForm() {
    if (!this.isEditPage) {
      this.formulario = this.fb.group({
        id: [null],
        nome: [null, Validators.required],
        username: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(8)]],
        cpf: [null, Validators.required],
        telefones: this.fb.array([]),
        enderecos: this.fb.array([])
      })
      this.addTelefone();
      this.addEnderecos();
    } else {
      this.formulario = this.fb.group({
        id: [null],
        nome: [null, Validators.required],
        telefones: this.fb.array([]),
        enderecos: this.fb.array([])
      })
      this.addTelefone();
      this.addEnderecos();

      this.formularioAddTelefone = this.fb.group({
        numero: [null, Validators.required]
      })
    }
  }

  get telefones(): FormArray {
    return this.formulario.get("telefones") as FormArray;
  }

  addTelefone() {
    const telefoneForm = this.fb.group({
      id: [null],
      numero: [null, Validators.required]
    })
    this.telefones.push(telefoneForm);
  }
  addTelefoneObject(telefone: Telefone) {
    const telefoneForm = this.fb.group({
      id: [telefone.id],
      numero: [telefone.numero, Validators.required]
    })
    this.telefones.push(telefoneForm);
  }

  get enderecos(): FormArray {
    return this.formulario.get("enderecos") as FormArray;
  }

  addEnderecos() {
    const enderecosForm = this.fb.group({
      id: [null],
      cep: [null, [Validators.required, FormValidator.formBuilderValidateCep]],
      rua: [null, Validators.required],
      numero: [null, Validators.required],
      complemento: [null],
      bairro: [null, Validators.required],
      cidade: [null, Validators.required],
      estado: [null, Validators.required],
    })
    this.enderecos.push(enderecosForm);
  }

  buscarCep(endereco: AbstractControl<any>) {
    if (endereco.get("cep")?.valid) {
      let cep = endereco.get("cep")?.value
      this.buscarEndereco.getEndereco(cep).subscribe(response => {
        this.enderecos.get('0')?.patchValue({
          cep: response.cep,
          rua: response.logradouro,
          complemento: response.complemento,
          bairro: response.bairro,
          cidade: response.localidade,
          estado: response.uf
        })
      })
    }
  }

  onSubmit() {
    this.formularioSubmitted = true;
    if (this.formulario.valid) {
      if (this.isEditPage) {
        this.inscricao.push(this.usuarioService.updateUsuario(this.formulario.value).subscribe({
          next: () => {
            // TODO EDITAR PUT REQUEST
            this.toastMessage.successMessage("Usuário editado com sucesso.")
            this.router.navigate(['/home']);
          },
          error: err => { this.toastMessage.errorMessage(HttpValidator.validateResponseErrorMessage(err))}
        }))
      } else {
        this.inscricao.push(this.usuarioService.addNewUsuario(this.formulario.value).subscribe({
          // TODO CADASTRAR POST REQUEST
          next: (response: any) => {
            this.toastMessage.successMessage("Usuário cadastrado com sucesso.")
            this.authService.savePermissions(JSON.stringify(response.authorities), response.jwt)
            this.router.navigate(['/home'])
          },
          error: err => {HttpValidator.validateResponseErrorMessage(err)}
        }))
      }
    }
  }

  onResetForm() {
    this.formularioSubmitted = false;
    this.formulario.reset();
  }

  private loadEditPage() {
    if (this.isEditPage) {
      this.titulo ="Dados do usuário";
      this.btnSubmitValue = "Salvar";
      this.inscricao.push(this.usuarioService.getUsuarioEmitter().subscribe({
        next: (response: Usuario) => {
          this.usuario = response;
          console.log(this.usuario.telefones)
          this.loadUsuarioOnForm(response);
        }
      }))
    }
  }

  loadUsuarioOnForm(usuario: Usuario) {
    this.formulario.patchValue({
      id: usuario.id,
      nome: usuario.nome,
      telefones: usuario.telefones,
      enderecos: usuario.enderecos
    })
  }

  validatorInputNgClass(input: string): string {
    return FormValidator.validateInputNgClass(this.formularioSubmitted, <FormControl> this.formulario.get(input))
  }

  validatorInputNgClassFormArray(input: string, itemFormArray: AbstractControl) {
    return FormValidator.validateInputNgClassFormArray(input, this.formularioSubmitted, itemFormArray);
  }

  validatorSmallGenericMessage(input: string, inputName: string) {
    return FormValidator.validateSmallGenericMessage(<FormControl> this.formulario.get(input),inputName)
  }

  validatorSmallGenericMessageFormArray (input: string, inputName: string, itemFormArray: AbstractControl, inputNameEqualsTo?: string){
    return FormValidator.validateSmallGenericMessageFormArray(input, inputName, itemFormArray, inputNameEqualsTo)
  }

  fixNgClassRegisterEditForm()  {
    return this.isEditPage ? "corrigirPosicaoEditar" : "corrigirPosicaoRegister";
  }

  ngOnDestroy(): void {
    this.inscricao.forEach(i => i.unsubscribe());
  }

  closeModalOnFormValid(): string {
    return this.formularioAddTelefone.valid ? 'modal' : '';
  }

  saveTelefone() {
    this.formularioAddTelefoneSubmitted = true
    if (this.formularioAddTelefone.valid) {
      this.callTelefoneApi();
    }
  }

  callTelefoneApi() {
    let telefone = new Telefone();
    telefone.numero = this.formularioAddTelefone.value['numero'];
    telefone.usuario = this.usuario;
    console.log(telefone)
    this.telefoneService.addTelefone(telefone).subscribe({
      next: response => {
        this.addTelefoneObject(response)
        this.usuario?.telefones?.push(response)
      },
      error: err => {this.toastMessage.errorMessage(HttpValidator.validateResponseErrorMessage(err))}
    })
  }



  validatorTelefone(input: string): string {
    return FormValidator.validateInputNgClass(this.formularioAddTelefoneSubmitted, <FormControl> this.formularioAddTelefone.get(input))
  }
}
