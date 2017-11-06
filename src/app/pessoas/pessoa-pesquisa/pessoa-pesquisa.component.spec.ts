import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaPesquisaComponent } from './pessoa-pesquisa.component';

describe('PessoaPesquisaComponent', () => {
  let component: PessoaPesquisaComponent;
  let fixture: ComponentFixture<PessoaPesquisaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PessoaPesquisaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoaPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
