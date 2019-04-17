import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SatoshiWalletPage } from './satoshi-wallet.page';

describe('SatoshiWalletPage', () => {
  let component: SatoshiWalletPage;
  let fixture: ComponentFixture<SatoshiWalletPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SatoshiWalletPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SatoshiWalletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
