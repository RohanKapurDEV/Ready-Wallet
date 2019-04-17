import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtherBuyPage } from './ether-buy.page';

describe('EtherBuyPage', () => {
  let component: EtherBuyPage;
  let fixture: ComponentFixture<EtherBuyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtherBuyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtherBuyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
