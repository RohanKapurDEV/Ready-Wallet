import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtherTradePage } from './ether-trade.page';

describe('EtherTradePage', () => {
  let component: EtherTradePage;
  let fixture: ComponentFixture<EtherTradePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtherTradePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtherTradePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
