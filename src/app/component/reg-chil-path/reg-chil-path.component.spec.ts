import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegChilPathComponent } from './reg-chil-path.component';

describe('RegChilPathComponent', () => {
  let component: RegChilPathComponent;
  let fixture: ComponentFixture<RegChilPathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegChilPathComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegChilPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
