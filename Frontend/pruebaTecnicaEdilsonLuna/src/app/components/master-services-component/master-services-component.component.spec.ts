import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterServicesComponentComponent } from './master-services-component.component';

describe('MasterServicesComponentComponent', () => {
  let component: MasterServicesComponentComponent;
  let fixture: ComponentFixture<MasterServicesComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterServicesComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MasterServicesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
