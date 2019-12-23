import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepriseCreateComponent } from './entreprise-create.component';

describe('EntrepriseCreateComponent', () => {
  let component: EntrepriseCreateComponent;
  let fixture: ComponentFixture<EntrepriseCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntrepriseCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrepriseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
