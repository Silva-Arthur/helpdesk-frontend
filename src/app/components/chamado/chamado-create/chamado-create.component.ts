import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from '../../../models/chamado';
import { TecnicoService } from '../../../services/tecnico.service';
import { Tecnico } from '../../../models/tecnico';
import { Cliente } from '../../../models/cliente';
import { ChamadoService } from 'src/app/services/chamado.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent implements OnInit {

  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];
  
  chamado: Chamado = {
    prioridade: '',
    status:  '',
    titulo: '',
    observacoes: '',
    tecnico: '',
    cliente: '',
    nomeCliente: '',
    nomeTecnico: '',
  }

  prioridade: FormControl = new FormControl(null, [Validators.required]); 
  status: FormControl = new FormControl(null, [Validators.required]); 
  titulo: FormControl = new FormControl(null, [Validators.required]); 
  observacoes: FormControl = new FormControl(null, [Validators.required]); 
  tecnico: FormControl = new FormControl(null, [Validators.required]); 
  cliente: FormControl = new FormControl(null, [Validators.required]); 

  constructor(
    private chamadoService: ChamadoService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private toastService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findAllClientes();
    this.findAllTecnicos();
  }

  findAllClientes(): void {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    });
  }

  findAllTecnicos(): void {
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    });
  }

  create(): void {
    this.chamadoService.create(this.chamado).subscribe(() => {
      this.toastService.success('Chamado criado com sucesso!', 'Chamado');
      this.router.navigate(['chamados']);
    }, ex => {
      this.toastService.error(ex.error.error);
    });
  }

  validaCampos(): boolean {
    return this.prioridade.valid
    && this.prioridade.valid
    && this.status.valid
    && this.titulo.valid
    && this.observacoes.valid
    && this.tecnico.valid
    && this.cliente.valid
  }

}
