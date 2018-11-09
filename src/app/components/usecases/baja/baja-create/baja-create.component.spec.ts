import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BajaCreateComponent } from './baja-create.component';

describe('BajaCreateComponent', () => {
  let component: BajaCreateComponent;
  let fixture: ComponentFixture<BajaCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BajaCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BajaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
