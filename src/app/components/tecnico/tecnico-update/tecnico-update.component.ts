import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from './../../../models/tecnico';
import { TecnicoService } from './../../../services/tecnico.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {


  tecnico: Tecnico = {
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
 
  update() {
    this.service.update(this.tecnico).subscribe(() => {
      this.toast.success('Técnico atualizado com sucesso!', 'Atualização');
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

  addPerfil(perfil: any): void {
    console.log(perfil)
    console.log(this.tecnico.perfis)
    if (this.tecnico.perfis.includes(perfil)) {
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1);      
      console.log(this.tecnico.perfis)
    } else {
      this.tecnico.perfis.push(perfil);
      console.log(this.tecnico.perfis)
    }
    console.log(this.tecnico.perfis)
  }

  validaCampos(): boolean {
    return this.nome.valid 
      && this.cpf.valid
      && this.email.valid
      && this.senha.valid
  }

  possuiPerfil() {
    console.log((this.tecnico.perfis) )
    this.checkAdmin = (this.tecnico.perfis) ? this.tecnico.perfis.find(element => element == 0) != undefined : false;
    this.checkCliente = (this.tecnico.perfis) ? this.tecnico.perfis.find(element => element == 1) != undefined : false;
    this.checkTecnico = (this.tecnico.perfis) ? this.tecnico.perfis.find(element => element == 2) != undefined : false;
  }

}
