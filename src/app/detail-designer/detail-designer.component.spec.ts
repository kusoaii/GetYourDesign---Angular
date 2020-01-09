import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDesignerComponent } from './detail-designer.component';

describe('DetailDesignerComponent', () => {
  let component: DetailDesignerComponent;
  let fixture: ComponentFixture<DetailDesignerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailDesignerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailDesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
