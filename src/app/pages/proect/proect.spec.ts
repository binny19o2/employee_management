import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Proect } from './proect';

describe('Proect', () => {
  let component: Proect;
  let fixture: ComponentFixture<Proect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Proect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Proect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
