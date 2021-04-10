import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegpathComponent } from './regpath.component';

describe('RegpathComponent', () => {
  let component: RegpathComponent;
  let fixture: ComponentFixture<RegpathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegpathComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegpathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
