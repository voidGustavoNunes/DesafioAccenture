import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FornecedorListComponent } from './fornecedor.list.component';

describe('FornecedorComponent', () => {
  let component: FornecedorListComponent;
  let fixture: ComponentFixture<FornecedorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FornecedorListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FornecedorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
