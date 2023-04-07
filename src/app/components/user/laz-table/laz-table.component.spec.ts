import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazTableComponent } from './laz-table.component';

describe('LazTableComponent', () => {
  let component: LazTableComponent;
  let fixture: ComponentFixture<LazTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LazTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LazTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
