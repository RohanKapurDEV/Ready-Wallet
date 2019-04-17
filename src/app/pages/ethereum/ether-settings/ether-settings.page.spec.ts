import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtherSettingsPage } from './ether-settings.page';

describe('EtherSettingsPage', () => {
  let component: EtherSettingsPage;
  let fixture: ComponentFixture<EtherSettingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtherSettingsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtherSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
