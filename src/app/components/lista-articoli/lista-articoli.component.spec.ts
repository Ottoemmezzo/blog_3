import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaArticoliComponent } from './lista-articoli.component';

describe('ListaArticoliComponent', () => {
  let component: ListaArticoliComponent;
  let fixture: ComponentFixture<ListaArticoliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaArticoliComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaArticoliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
