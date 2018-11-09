import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BajaindexComponent } from './bajaindex.component';

describe('BajaindexComponent', () => {
  let component: BajaindexComponent;
  let fixture: ComponentFixture<BajaindexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BajaindexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BajaindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
