import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoasVindasComponent } from './boas-vindas.component';

describe('BoasVindasComponent', () => {
  let component: BoasVindasComponent;
  let fixture: ComponentFixture<BoasVindasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoasVindasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoasVindasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
