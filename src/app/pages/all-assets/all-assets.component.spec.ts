import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAssetsComponent } from './all-assets.component';

describe('AllAssetsComponent', () => {
  let component: AllAssetsComponent;
  let fixture: ComponentFixture<AllAssetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllAssetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
