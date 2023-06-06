import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassvalidationComponent } from './passvalidation.component';

describe('PassvalidationComponent', () => {
  let component: PassvalidationComponent;
  let fixture: ComponentFixture<PassvalidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassvalidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassvalidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
