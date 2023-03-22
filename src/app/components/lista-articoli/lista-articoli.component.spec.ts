import { ComponentFixture, TestBed } from '@angular/core/testing';

import { this } from './lista-articoli.component';

describe('ListaArticoliComponent', () => {
  let component: this;
  let fixture: ComponentFixture<this>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ this ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(this);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
