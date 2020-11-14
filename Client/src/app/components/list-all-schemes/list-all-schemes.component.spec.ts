import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllSchemesComponent } from './list-all-schemes.component';

describe('ListAllSchemesComponent', () => {
  let component: ListAllSchemesComponent;
  let fixture: ComponentFixture<ListAllSchemesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAllSchemesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAllSchemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
