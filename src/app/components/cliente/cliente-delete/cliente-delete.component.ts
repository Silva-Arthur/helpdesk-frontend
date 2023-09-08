import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

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
 
  delete() {
    this.service.delete(this.cliente.id).subscribe(() => {
      this.toast.success('Cliente deletado com sucesso!', 'Exclusão');
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

  possuiPerfil() {
    console.log((this.cliente.perfis) )
    this.checkAdmin = (this.cliente.perfis) ? this.cliente.perfis.find(element => element == 0) != undefined : false;
    this.checkCliente = (this.cliente.perfis) ? this.cliente.perfis.find(element => element == 1) != undefined : false;
    this.checkCliente = (this.cliente.perfis) ? this.cliente.perfis.find(element => element == 2) != undefined : false;
  }

}
