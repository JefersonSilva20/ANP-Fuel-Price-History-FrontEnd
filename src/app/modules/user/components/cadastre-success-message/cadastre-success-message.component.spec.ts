import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastreSuccessMessageComponent } from './cadastre-success-message.component';

describe('CadastreSuccessMessageComponent', () => {
  let component: CadastreSuccessMessageComponent;
  let fixture: ComponentFixture<CadastreSuccessMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastreSuccessMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastreSuccessMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
