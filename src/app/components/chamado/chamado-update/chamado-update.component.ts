import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.css']
})
export class ChamadoUpdateComponent implements OnInit {

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
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    this.findAllClientes();
    this.findAllTecnicos();
  }

  findById(): void {
    this.chamadoService.findById(this.chamado.id).subscribe(resposta => {
      this.chamado = resposta;
    }, ex => {
      this.toastService.error(ex.error.error);
    })
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

  update(): void {
    this.chamadoService.update(this.chamado).subscribe(() => {
      this.toastService.success('Chamado alterado com sucesso!', 'Chamado');
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

  retornaStatus(status: any): string {
    switch (status) {
      case 0: 
        return 'ABERTO';
      case 1:
        return 'EM ANDAMENTO';
      default:
        return 'ENCERRADO';
    }
  }
  
  retornaPrioridade(prioridade: any): string {
    switch (prioridade) {
      case 0: 
        return 'BAIXA';
      case 1:
        return 'MÉDIA';
      default:
        return 'ALTA';
    }
  }

}
