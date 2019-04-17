import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BitcoinPage } from './bitcoin.page';

describe('BitcoinPage', () => {
  let component: BitcoinPage;
  let fixture: ComponentFixture<BitcoinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BitcoinPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BitcoinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
