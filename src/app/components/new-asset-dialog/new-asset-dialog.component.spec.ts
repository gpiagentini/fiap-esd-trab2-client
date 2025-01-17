import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAssetDialogComponent } from './new-asset-dialog.component';

describe('NewAssetDialogComponent', () => {
  let component: NewAssetDialogComponent;
  let fixture: ComponentFixture<NewAssetDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAssetDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAssetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
