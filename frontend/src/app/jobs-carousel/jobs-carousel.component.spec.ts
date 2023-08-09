import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsCarouselComponent } from './jobs-carousel.component';

describe('JobsCarouselComponent', () => {
  let component: JobsCarouselComponent;
  let fixture: ComponentFixture<JobsCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobsCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
