import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSchemeComponent } from './edit-scheme.component';

describe('EditSchemeComponent', () => {
  let component: EditSchemeComponent;
  let fixture: ComponentFixture<EditSchemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSchemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
