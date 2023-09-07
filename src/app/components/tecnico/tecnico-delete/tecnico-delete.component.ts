import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from './../../../models/tecnico';
import { TecnicoService } from './../../../services/tecnico.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {

  tecnico: Tecnico = {
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
    private service: TecnicoService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute //permite pegar valor de parametros na URL
  ) { }

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get('id');    
    this.findById();
  }
  
  findById(): void {    
    this.service.findById(this.tecnico.id).subscribe(resposta => {
      this.tecnico = resposta;
      console.log(this.tecnico);
      this.possuiPerfil();
    });
  }
 
  delete() {
    this.service.delete(this.tecnico.id).subscribe(() => {
      this.toast.success('Técnico deletado com sucesso!', 'Exclusão');
      this.router.navigate(['tecnicos'])
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
    console.log((this.tecnico.perfis) )
    this.checkAdmin = (this.tecnico.perfis) ? this.tecnico.perfis.find(element => element == 0) != undefined : false;
    this.checkCliente = (this.tecnico.perfis) ? this.tecnico.perfis.find(element => element == 1) != undefined : false;
    this.checkTecnico = (this.tecnico.perfis) ? this.tecnico.perfis.find(element => element == 2) != undefined : false;
  }

}
