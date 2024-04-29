import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeferLeserComponent } from './defer-leser.component';

describe('DeferLeserComponent', () => {
  let component: DeferLeserComponent;
  let fixture: ComponentFixture<DeferLeserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeferLeserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeferLeserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
