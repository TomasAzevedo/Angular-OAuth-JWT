import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { MoneyHttp } from './money-http';
import { Http, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';

import { SegurancaRoutingModule } from './seguranca-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';

import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { NaoAutorizadoComponent } from './nao-autorizado/nao-autorizado.component';

export function authHttpServiceFactory(authService: AuthService, http: Http, options: RequestOptions): AuthHttp {

    const config = new AuthConfig({
        globalHeaders: [
            { 'Content-Type': 'application/json' }
        ]
    });

    return new MoneyHttp(authService, config, http, options);
}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,

        InputTextModule,
        ButtonModule,

        SegurancaRoutingModule
    ],
    declarations: [LoginFormComponent, NaoAutorizadoComponent],
    providers: [
        {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [AuthService, Http, RequestOptions]
        },
        AuthGuard
    ]
})
export class SegurancaModule { }
