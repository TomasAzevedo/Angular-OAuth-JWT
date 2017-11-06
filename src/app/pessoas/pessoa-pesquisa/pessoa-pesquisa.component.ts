import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { PessoaFiltro, PessoaService } from './../pessoa.service';
import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-pessoa-pesquisa',
    templateUrl: './pessoa-pesquisa.component.html',
    styleUrls: ['./pessoa-pesquisa.component.css']
})
export class PessoaPesquisaComponent implements OnInit {

    totalRegistros = 0;
    filtro = new PessoaFiltro();
    pessoas = [];
    @ViewChild('tabela') tabela;


    constructor(private pessoaService: PessoaService,
        private toastyService: ToastyService,
        private confirmation: ConfirmationService,
        private errorHandler: ErrorHandlerService,
        private title: Title) {

    }



    ngOnInit() {
        this.title.setTitle('Pessoas');
    }



    aoMudarPagina(event: LazyLoadEvent) {
        const pagina = event.first / event.rows;
        this.pesquisar(pagina);
    }



    pesquisar(pagina = 0) {

        this.filtro.pagina = pagina;

        this.pessoaService.pesquisar(this.filtro)
            .then(resultado => {
                this.totalRegistros = resultado.total;
                this.pessoas = resultado.pessoas;
            });
    }



    confirmaExclusao(pessoa: any) {

        this.confirmation.confirm({
            message: 'Tem certeza que deseja escluir?',
            accept: () => {
                this.excluir(pessoa);
            }
        });
    }



    excluir(lancamento: any) {

        this.pessoaService.excluir(lancamento.codigo)
            .then(() => {

                //Reinicia os dados da tabla
                if (this.tabela.first === 0) {
                    this.pesquisar();
                } else {
                    this.tabela.first = 0;
                }

                this.toastyService.success('Pessoa exluída com sucesso.');

            }).catch(erro => this.errorHandler.handle(erro));
    }


    alternarStatus(pessoa: any): void {

        const novoStatus = !pessoa.ativo;

        this.pessoaService.mudarStatus(pessoa.codigo, novoStatus)
            .then(() => {

                const acao = novoStatus ? 'ativada' : 'desativada';

                pessoa.ativo = novoStatus;
                this.toastyService.success(`Pessoa ${acao} com sucesso!`);
            })
            .catch(erro => this.errorHandler.handle(erro));
    }

}
