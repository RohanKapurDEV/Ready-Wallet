import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SatoshiBuyPage } from './satoshi-buy.page';

describe('SatoshiBuyPage', () => {
  let component: SatoshiBuyPage;
  let fixture: ComponentFixture<SatoshiBuyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SatoshiBuyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SatoshiBuyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
