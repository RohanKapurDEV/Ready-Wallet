import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EthereumPage } from './ethereum.page';

describe('EthereumPage', () => {
  let component: EthereumPage;
  let fixture: ComponentFixture<EthereumPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EthereumPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EthereumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
