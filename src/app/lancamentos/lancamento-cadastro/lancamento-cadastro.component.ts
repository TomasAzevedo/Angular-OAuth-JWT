import { Title } from '@angular/platform-browser';
import { ToastyService } from 'ng2-toasty';
import { LancamentoService } from './../lancamento.service';
import { FormControl } from '@angular/forms';
import { Lancamento } from './../../core/model';
import { PessoaService } from './../../pessoas/pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'app-lancamento-cadastro',
    templateUrl: './lancamento-cadastro.component.html',
    styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

    tipos = [
        { label: 'Receita', value: 'RECEITA' },
        { label: 'Despesa', value: 'DESPESA' },
    ];

    categorias = [];

    pessoas = [];

    lancamento = new Lancamento();


    constructor(private categoriaService: CategoriaService,
        private errorHandler: ErrorHandlerService,
        private pessoaService: PessoaService,
        private lancamentoService: LancamentoService,
        private toasty: ToastyService,
        private route: ActivatedRoute,
        private router: Router,
        private title: Title) {

    }

    ngOnInit() {

        this.title.setTitle('Novo Lançamento');

        const codigoLancamento = this.route.snapshot.params['codigo'];
        if (codigoLancamento) {
            this.carregarLancamento(codigoLancamento);
        }

        this.carregarCategorias();
        this.carregarPessoas();
    }


    atualizarTituloEdicao() {
        this.title.setTitle('Editar Lançamento: ' + this.lancamento.descricao);
    }


    carregarCategorias() {

        return this.categoriaService
            .listarTodas()
            .then(categorias => {

                this.categorias = categorias.map(c => ({ label: c.nome, value: c.codigo }));
            })
            .catch(erro => this.errorHandler.handle(erro));
    }


    carregarPessoas() {

        return this.pessoaService
            .listarTodas()
            .then(pessoas => {

                this.pessoas = pessoas.map(p => ({ label: p.nome, value: p.codigo }));
            })
            .catch(erro => this.errorHandler.handle(erro));
    }


    salvar(form: FormControl) {

        if (this.editando) {

            this.atualizarLancamento(form);

        } else {

            this.adicionarLancamento(form);

        }
    }


    atualizarLancamento(form: FormControl) {

        this.lancamentoService
            .atualizar(this.lancamento)
            .then(lancamento => {

                this.lancamento = lancamento;
                this.toasty.success('Lançamento alterado com sucesso!');
                this.atualizarTituloEdicao();
            })
            .catch(erro => this.errorHandler.handle(erro));
    }


    adicionarLancamento(form: FormControl) {

        this.lancamentoService
            .adicionar(this.lancamento)
            .then((lancamento) => {

                this.toasty.success('Lançamento adicionado com sucesso!');
                //form.reset();
                //this.lancamento = new Lancamento();
                this.router.navigate(['/lancamentos', lancamento.codigo]);
            })
            .catch(erro => this.errorHandler.handle(erro));
    }


    carregarLancamento(codigo) {

        this.lancamentoService
            .buscarPorCodigo(codigo)
            .then(lancamento => {
                this.lancamento = lancamento;
                this.atualizarTituloEdicao();
            })
            .catch(erro => this.errorHandler.handle(erro));
    }


    get editando() {
        return Boolean(this.lancamento.codigo);
    }


    novo(form: FormControl) {
        form.reset();

        setTimeout(()=> {

            this.lancamento = new Lancamento();
        }, 2);
        this.router.navigate(["/lancamentos/novo"]);
    }

}
