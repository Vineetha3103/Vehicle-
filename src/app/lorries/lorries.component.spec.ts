import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LorriesComponent } from './lorries.component';

describe('LorriesComponent', () => {
  let component: LorriesComponent;
  let fixture: ComponentFixture<LorriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LorriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LorriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
