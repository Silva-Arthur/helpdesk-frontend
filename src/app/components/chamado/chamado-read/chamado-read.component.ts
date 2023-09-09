import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from '../../../models/chamado';
import { ChamadoService } from 'src/app/services/chamado.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chamado-read',
  templateUrl: './chamado-read.component.html',
  styleUrls: ['./chamado-read.component.css']
})
export class ChamadoReadComponent implements OnInit {

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

  constructor(
    private chamadoService: ChamadoService,
    private toastService: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.chamadoService.findById(this.chamado.id).subscribe(resposta => {
      this.chamado = resposta;
    }, ex => {
      this.toastService.error(ex.error.error);
    })
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
