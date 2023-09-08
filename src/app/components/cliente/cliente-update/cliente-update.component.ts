import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {


  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, [Validators.minLength(3), Validators.required]);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  checkAdmin =  false;
  checkCliente = false;
  checkTecnico = false;

  constructor(
    private service: ClienteService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute //permite pegar valor de parametros na URL
  ) { }

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get('id');    
    this.findById();
  }
  
  findById(): void {    
    this.service.findById(this.cliente.id).subscribe(resposta => {
      this.cliente = resposta;
      console.log(this.cliente);
      this.possuiPerfil();
    });
  }
 
  update() {
    this.service.update(this.cliente).subscribe(() => {
      this.toast.success('Cliente atualizado com sucesso!', 'Atualização');
      this.router.navigate(['clientes'])
    }, ex => { // caso venha uma exceção
      if (ex.error.errros) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    });
  }

  addPerfil(perfil: any): void {
    console.log(perfil)
    console.log(this.cliente.perfis)
    if (this.cliente.perfis.includes(perfil)) {
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1);      
      console.log(this.cliente.perfis)
    } else {
      this.cliente.perfis.push(perfil);
      console.log(this.cliente.perfis)
    }
    console.log(this.cliente.perfis)
  }

  validaCampos(): boolean {
    return this.nome.valid 
      && this.cpf.valid
      && this.email.valid
      && this.senha.valid
  }

  possuiPerfil() {
    console.log((this.cliente.perfis) )
    this.checkAdmin = (this.cliente.perfis) ? this.cliente.perfis.find(element => element == 0) != undefined : false;
    this.checkCliente = (this.cliente.perfis) ? this.cliente.perfis.find(element => element == 1) != undefined : false;
    this.checkTecnico = (this.cliente.perfis) ? this.cliente.perfis.find(element => element == 2) != undefined : false;
  }

}
