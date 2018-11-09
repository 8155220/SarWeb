import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BajaDetailComponent } from './baja-detail.component';

describe('BajaDetailComponent', () => {
  let component: BajaDetailComponent;
  let fixture: ComponentFixture<BajaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BajaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BajaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
