import { AuthHttp } from 'angular2-jwt';
import { Pessoa } from './../core/model';
import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';

export class PessoaFiltro {

    nome: string;
    pagina = 0;
    qtdPorPagina = 5;
    listar = false;
}

@Injectable()
export class PessoaService {

    url: string = 'http://localhost:8080/pessoas';

    constructor(private http: AuthHttp) {

    }


    pesquisar(filtro: PessoaFiltro): Promise<any> {

        const params = new URLSearchParams();
        params.set('page', filtro.pagina.toString());
        params.set('size', filtro.qtdPorPagina.toString());

        if (filtro.nome) {
            params.set('nome', filtro.nome);
        }

        return this.http.get(`${this.url}`, { search: params })
            .toPromise()
            .then(response => {
                const pessoas = response.json().content;
                const resultado = {
                    pessoas: pessoas,
                    total: response.json().totalElements
                }
                return resultado;
            });

    }


    listarTodas(): Promise<any> {

        return this.http.get(`${this.url}`)
            .toPromise()
            .then(response => {
                return response.json().content;
            });

    }


    excluir(codigo: number): Promise<void> {

        return this.http.delete(`${this.url}/${codigo}`).toPromise().then(() => null);
    }


    mudarStatus(codigo: number, ativo: boolean): Promise<void> {

        return this.http.put(`${this.url}/${codigo}/ativo`, ativo)
            .toPromise()
            .then(() => null);
    }


    adicionar(pessoa: Pessoa): Promise<Pessoa> {

        return this.http.post(this.url, JSON.stringify(pessoa))
            .toPromise()
            .then(response => response.json());
    }


    atualizar(pessoa: Pessoa): Promise<Pessoa> {

        return this.http.put(`${this.url}/${pessoa.codigo}`,
            JSON.stringify(pessoa))
            .toPromise()
            .then(response => {

                return response.json() as Pessoa;
            });
    }


    buscarPorCodigo(codigo: number): Promise<Pessoa> {

        return this.http.get(`${this.url}/${codigo}`)
            .toPromise()
            .then(response => {

                return response.json() as Pessoa;
            });
    }

}
