import { AuthGuard } from './../seguranca/auth.guard';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoaPesquisaComponent } from './pessoa-pesquisa/pessoa-pesquisa.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
    {
        path: 'pessoas',
        component: PessoaPesquisaComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_PESQUISAR_PESSOAS'] }
    },
    {
        path: 'pessoas/nova',
        component: PessoaCadastroComponent ,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_PESQUISAR_PESSOAS'] }
    },
    {
        path: 'pessoas/:codigo',
        component: PessoaCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_PESQUISAR_PESSOAS'] }
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class PessoasRoutingModule { }
