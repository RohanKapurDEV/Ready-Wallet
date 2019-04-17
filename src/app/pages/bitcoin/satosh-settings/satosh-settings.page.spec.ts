import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SatoshSettingsPage } from './satosh-settings.page';

describe('SatoshSettingsPage', () => {
  let component: SatoshSettingsPage;
  let fixture: ComponentFixture<SatoshSettingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SatoshSettingsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SatoshSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
