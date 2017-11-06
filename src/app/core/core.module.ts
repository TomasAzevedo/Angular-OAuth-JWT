import { AuthService } from './../seguranca/auth.service';
import { Title } from '@angular/platform-browser';
import { CategoriaService } from './../categorias/categoria.service';
import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ToastyModule } from 'ng2-toasty';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { PessoaService } from '../pessoas/pessoa.service';
import { RouterModule } from '@angular/router';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { JwtHelper } from 'angular2-jwt';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ToastyModule.forRoot(),
        ConfirmDialogModule
    ],
    declarations: [NavbarComponent, PaginaNaoEncontradaComponent],
    exports: [NavbarComponent,
              ToastyModule,
              ConfirmDialogModule],
    providers: [
        ErrorHandlerService,
        LancamentoService,
        PessoaService,
        ConfirmationService,
        Title,
        CategoriaService,
        {provide: LOCALE_ID, useValue: 'pt-BR'},
        AuthService,
        JwtHelper
    ]
})
export class CoreModule { }
