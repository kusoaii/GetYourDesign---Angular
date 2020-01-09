import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDesignerComponent } from './register-designer.component';

describe('RegisterDesignerComponent', () => {
  let component: RegisterDesignerComponent;
  let fixture: ComponentFixture<RegisterDesignerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterDesignerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterDesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
