import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';

import { AuthConfig, AuthHttp, JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';


export class NotAuthenticatedError {

}

@Injectable()
export class MoneyHttp extends AuthHttp {

    constructor(
        private authService: AuthService,
        options: AuthConfig,
        http: Http, defOpts?: RequestOptions
    ) {
        super(options, http, defOpts);
    }

    public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.fazerRequisicao(() => super.delete(url, options));
    }

    public patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.fazerRequisicao(() => super.patch(url, options));
    }

    public head(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.fazerRequisicao(() => super.head(url, options));
    }

    public options(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.fazerRequisicao(() => super.options(url, options));
    }

    public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.fazerRequisicao(() => super.get(url, options));
    }

    public post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.fazerRequisicao(() => super.post(url, body, options));
    }

    public put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.fazerRequisicao(() => super.put(url, body, options));
    }

    private fazerRequisicao(fn: Function): Observable<Response> {

        if (this.authService.isAccessTokenInvalido()) {

            console.log('Requisição HTTP com access token inválido. Obtendo novo token...');

            const novoAccessTokenPromise = this.authService.obrerNovoAccessToken()
                .then(() => {

                    if(this.authService.isAccessTokenInvalido()) {
                        throw new NotAuthenticatedError();
                    }
                    
                    return fn().toPromise();

                });

            return Observable.fromPromise(novoAccessTokenPromise);

        } else {

            return fn();

        }
    }

}
