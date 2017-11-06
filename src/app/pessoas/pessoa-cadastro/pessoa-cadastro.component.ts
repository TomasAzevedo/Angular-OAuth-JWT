import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Pessoa } from './../../core/model';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { PessoaService } from './../pessoa.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-pessoa-cadastro',
    templateUrl: './pessoa-cadastro.component.html',
    styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

    pessoa: Pessoa = new Pessoa();

    constructor(private pessoaService: PessoaService,
        private toasty: ToastyService,
        private errorHandler: ErrorHandlerService,
        private route: ActivatedRoute,
        private router: Router,
        private title: Title) { }

    ngOnInit() {

        this.title.setTitle('Nova Pessoa');

        const codigoPessoa = this.route.snapshot.params['codigo'];

        if (codigoPessoa) {
            this.carregarPessoa(codigoPessoa);
        }
    }


    atualizarTituloEdicao() {
        this.title.setTitle('Editar Pessoa: ' + this.pessoa.nome);
    }


    salvar(form: FormControl) {

        if (this.editando) {

            this.atualizarPessoa(form);

        } else {

            this.adicionarPessoa(form);

        }
    }


    atualizarPessoa(form: FormControl) {

        this.pessoaService
            .atualizar(this.pessoa)
            .then(pessoa => {

                this.pessoa = pessoa;
                this.toasty.success('Pessoa alterada com sucesso!');
                this.atualizarTituloEdicao();
            })
            .catch(erro => this.errorHandler.handle(erro));
    }


    adicionarPessoa(form: FormControl) {

        this.pessoaService
            .adicionar(this.pessoa)
            .then((pessoa) => {

                this.toasty.success('Pessoa adicionada com sucesso!');
                //form.reset();
                //this.pessoa = new Pessoa();
                this.router.navigate(['/pessoas', pessoa.codigo]);
            })
            .catch(erro => this.errorHandler.handle(erro));
    }


    get editando() {
        return Boolean(this.pessoa.codigo);
    }


    carregarPessoa(codigoPessoa) {

        this.pessoaService
            .buscarPorCodigo(codigoPessoa)
            .then((pessoa) => {
                this.pessoa = pessoa;
                this.atualizarTituloEdicao();
            })
            .catch(erro => this.errorHandler.handle(erro));
    }


    nova(form: FormControl) {
        form.reset();

        setTimeout(()=> {

            this.pessoa = new Pessoa();
        }, 2);
        this.router.navigate(["/pessoas/nova"]);
    }

}
