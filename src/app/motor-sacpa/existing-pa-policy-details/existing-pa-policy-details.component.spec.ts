import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingPaPolicyDetailsComponent } from './existing-pa-policy-details.component';

describe('ExistingPaPolicyDetailsComponent', () => {
  let component: ExistingPaPolicyDetailsComponent;
  let fixture: ComponentFixture<ExistingPaPolicyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistingPaPolicyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingPaPolicyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
