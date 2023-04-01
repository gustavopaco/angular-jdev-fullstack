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
import {defineLocale, ptBrLocale} from "ngx-bootstrap/chronos";
import {BsLocaleService} from "ngx-bootstrap/datepicker";
import {DataFormatService} from "../../../shared/service/data-format.service";
import {Profissao} from "../../../shared/model/Profissao";
import {ProfissaoService} from "../../../shared/service/profissao.service";

defineLocale('pt-br', ptBrLocale);

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

  maxDate: Date = new Date();
  profissoes: Profissao[] = [];

  constructor(
    private fb: FormBuilder,
    private buscarEndereco: BuscarEnderecoService,
    private usuarioService: UsuarioService,
    private toastMessage: ToastMessageService,
    private router: Router,
    private authService: AuthService,
    private location: Location,
    private telefoneService: TelefoneService,
    private localService: BsLocaleService,
    private dataFormatService: DataFormatService,
    private profissaoService: ProfissaoService) {
    this.locationHref = location;
    localService.use('pt-br')
  }

  ngOnInit(): void {
    this.loadDataFromDataBase();
    this.generateForm();
    this.loadEditPage();
  }

  private loadDataFromDataBase() {
      this.profissaoService.getAllProfissoes().subscribe({
        next: response => {this.profissoes = response;},
        error: err => {HttpValidator.validateResponseErrorMessage(err)}
      })
  }


  private generateForm() {
    if (!this.isEditPage) {
      this.generateFormRegister()
    } else {
      this.generateFormEdit();
    }
  }

  private generateFormRegister() {
    this.formulario = this.fb.group({
      id: [null],
      nome: [null, Validators.required],
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      cpf: [null, Validators.required],
      salario: [null, Validators.required],
      dataNascimento: [null, Validators.required],
      profissao: [null, Validators.required],
      telefones: this.fb.array([]),
      enderecos: this.fb.array([])
    })
    this.addTelefone();
    this.addEndereco();
  }

  private generateFormEdit() {
    this.formulario = this.fb.group({
      id: [null],
      nome: [null, Validators.required],
      salario: [null, Validators.required],
      dataNascimento: [null, Validators.required],
      profissao: [null, Validators.required],
      telefones: this.fb.array([]),
      enderecos: this.fb.array([])
    })
    this.addEndereco();

    this.formularioAddTelefone = this.fb.group({
      numero: [null, Validators.required]
    })
  }

  get telefones(): FormArray {
    return this.formulario.get("telefones") as FormArray;
  }

  private addTelefone() {
    const telefoneForm = this.fb.group({
      id: [null],
      numero: [null, Validators.required]
    })
    this.telefones.push(telefoneForm);
  }

  private addTelefoneObject(telefone: Telefone) {
    const telefoneForm = this.fb.group({
      id: [telefone.id],
      numero: [telefone.numero, Validators.required]
    })
    this.telefones.push(telefoneForm);
  }

  private removeTelefone(telefoneIndex: number) {
    return this.telefones.removeAt(telefoneIndex);
  }

  get enderecos(): FormArray {
    return this.formulario.get("enderecos") as FormArray;
  }

  private addEndereco() {
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

  compareObjects(obj1: any, obj2: any) {
    return (obj1 && obj2) ? (obj1.id == obj2.id) : obj1 == obj2;
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
          error: err => {
            this.toastMessage.errorMessage(HttpValidator.validateResponseErrorMessage(err))
          }
        }))
      } else {
        this.inscricao.push(this.usuarioService.addNewUsuario(this.formulario.value).subscribe({
          // TODO CADASTRAR POST REQUEST
          next: (response: any) => {
            this.toastMessage.successMessage("Usuário cadastrado com sucesso.")
            this.authService.savePermissions(response.id, JSON.stringify(response.authorities), response.jwt)
            this.router.navigate(['/home'])
          },
          error: err => {
            console.log(err)
            this.toastMessage.errorMessage(HttpValidator.validateResponseErrorMessage(err))
          }
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
      this.titulo = "Dados do usuário";
      this.btnSubmitValue = "Salvar";
      this.inscricao.push(this.usuarioService.getUsuarioEmitter().subscribe({
        next: (response: Usuario) => {
          this.usuario = response;
          if (this.usuario.dataNascimento) {
            this.usuario.dataNascimento = this.dataFormatService.formatUTCLocalDateToBrazilDate(this.usuario.dataNascimento.toString())
          }
          this.loadUsuarioOnEditPage(response);
        }
      }))
    }
  }

  private loadUsuarioOnEditPage(usuario: Usuario) {
    this.formulario.patchValue({
      id: usuario.id,
      nome: usuario.nome,
      salario: usuario.salario,
      dataNascimento: usuario.dataNascimento,
      profissao: usuario.profissao,
      enderecos: usuario.enderecos
    })
    usuario.telefones?.forEach(tel => this.addTelefoneObject(tel))
  }

  saveNewTelefone() {
    this.formularioAddTelefoneSubmitted = true
    if (this.formularioAddTelefone.valid) {
      this.saveNewTelefoneApi();
    }
  }

  saveNewTelefoneApi() {
    let telefone = new Telefone();
    telefone.numero = this.formularioAddTelefone.value['numero'];
    telefone.usuario = this.usuario;
    this.inscricao.push(this.telefoneService.addTelefone(telefone).subscribe({
      next: response => {
        this.formularioAddTelefone.reset();
        this.toastMessage.successMessage("Novo telefone cadastrado com sucesso.")
        this.addTelefoneObject(response)
        this.usuario?.telefones?.push(response)
      },
      error: err => {
        this.toastMessage.errorMessage(HttpValidator.validateResponseErrorMessage(err))
      }
    }))
  }

  deleteTelefoneApi(id: number | undefined, j: number) {
    if (id) {
      this.inscricao.push(this.telefoneService.deleteTelefone(id).subscribe({
        next: () => {
          this.toastMessage.successMessage("Telefone deletado com sucesso.")
          if (this.usuario) {
            this.usuario.telefones = this.usuario!.telefones?.filter(tel => tel.id != id)
            this.removeTelefone(j);
          }
        },
        error: err => {
          HttpValidator.validateResponseErrorMessage(err)
        }
      }))
    }
  }

  validatorInputNgClass(input: string): string {
    return FormValidator.validateInputNgClass(this.formularioSubmitted, <FormControl>this.formulario.get(input))
  }

  validatorInputNgClassFormArray(input: string, itemFormArray: AbstractControl) {
    return FormValidator.validateInputNgClassFormArray(input, this.formularioSubmitted, itemFormArray);
  }

  validatorSmallGenericMessage(input: string, inputName: string) {
    return FormValidator.validateSmallGenericMessage(<FormControl>this.formulario.get(input), inputName)
  }

  validatorSmallGenericMessageFormArray(input: string, inputName: string, itemFormArray: AbstractControl, inputNameEqualsTo?: string) {
    return FormValidator.validateSmallGenericMessageFormArray(input, inputName, itemFormArray, inputNameEqualsTo)
  }

  fixNgClassRegisterEditForm() {
    return this.isEditPage ? "corrigirPosicaoEditar" : "corrigirPosicaoRegister";
  }

  closeModalOnFormValid(): string {
    return this.formularioAddTelefone.valid ? 'modal' : '';
  }

  validatorTelefone(input: string): string {
    return FormValidator.validateInputNgClass(this.formularioAddTelefoneSubmitted, <FormControl>this.formularioAddTelefone.get(input))
  }

  ngOnDestroy(): void {
    this.inscricao.forEach(i => i.unsubscribe());
  }
}
