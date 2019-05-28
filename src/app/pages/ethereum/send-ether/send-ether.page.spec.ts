import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendEtherPage } from './send-ether.page';

describe('SendEtherPage', () => {
  let component: SendEtherPage;
  let fixture: ComponentFixture<SendEtherPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendEtherPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendEtherPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
