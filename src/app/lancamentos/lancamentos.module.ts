import { LancamentosRoutingModule } from './lancamentos-routing.module';
import { SharedModule } from './../shared/shared.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { FormsModule } from '@angular/forms';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentoPesquisaComponent } from './lancamento-pesquisa/lancamento-pesquisa.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        InputTextModule,
        ButtonModule,
        DataTableModule,
        TooltipModule,
        InputTextareaModule,
        CalendarModule,
        SelectButtonModule,
        DropdownModule,
        CurrencyMaskModule,
        SharedModule,
        LancamentosRoutingModule
    ],
    declarations: [LancamentoPesquisaComponent,
                   LancamentoCadastroComponent
    ],
    exports: []
})
export class LancamentosModule { }
