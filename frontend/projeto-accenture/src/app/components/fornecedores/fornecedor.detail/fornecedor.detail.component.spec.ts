import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FornecedorDetailComponent } from './fornecedor.detail.component';

describe('FornecedorDetailComponent', () => {
  let component: FornecedorDetailComponent;
  let fixture: ComponentFixture<FornecedorDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FornecedorDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FornecedorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
