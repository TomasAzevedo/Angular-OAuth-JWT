import { AuthService } from './../../seguranca/auth.service';
import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-lancamento-pesquisa',
    templateUrl: './lancamento-pesquisa.component.html',
    styleUrls: ['./lancamento-pesquisa.component.css']
})
export class LancamentoPesquisaComponent implements OnInit {

    totalRegistros = 0;
    filtro = new LancamentoFiltro();
    lancamentos = [];
    @ViewChild('tabela') tabela;

    constructor(private lancamentoService: LancamentoService,
                private toastyService: ToastyService,
                private confirmation: ConfirmationService,
                private errorHandler: ErrorHandlerService,
                private title: Title,
                private authService: AuthService) { }


    ngOnInit() {
        this.title.setTitle('Lançamentos');
    }



    aoMudarPagina(event: LazyLoadEvent) {

        const pagina = event.first / event.rows;
        this.pesquisar(pagina);
    }



    pesquisar(pagina = 0) {

        this.filtro.pagina = pagina;

        this.lancamentoService.pesquisar(this.filtro).then((resultado) => {

            this.lancamentos = resultado.lancamentos;
            this.totalRegistros = resultado.total;

        }).catch(erro => this.errorHandler.handle(erro));
    }



    confirmaExclusao(lancamento: any) {

        this.confirmation.confirm({
            message: 'Tem certeza que deseja escluir?',
            accept: () => {
                this.excluir(lancamento);
            }
        });
    }



    excluir(lancamento: any) {

        this.lancamentoService.excluir(lancamento.codigo)
            .then(()=>{

                //Reinicia os dados da tabla
                if(this.tabela.first === 0) {
                    this.pesquisar();
                } else {
                    this.tabela.first = 0;
                }

                this.toastyService.success('Lançamento exluído com sucesso.');

            }).catch(erro => this.errorHandler.handle(erro));
    }

}
