import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociacaoComponent } from './associacao.component';

describe('AssociacaoComponent', () => {
  let component: AssociacaoComponent;
  let fixture: ComponentFixture<AssociacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
