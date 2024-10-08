import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneTaskComponent } from './one-task.component';

describe('OneTaskComponent', () => {
  let component: OneTaskComponent;
  let fixture: ComponentFixture<OneTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OneTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
