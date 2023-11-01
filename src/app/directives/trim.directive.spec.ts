import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, ElementRef, Renderer2 } from '@angular/core';
import { NgControl, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { TrimDirective } from './trim.directive';

@Component({
  template: `<input type="text" testId="input" trimFormControl />`,
})
class TestComponent {}

describe('Directive: Trim', () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputElement: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrimDirective, TestComponent],
      providers: [
        Renderer2,
        {
          provide: ElementRef,
          useValue: { nativeElement: document.createElement('input') },
        },
        {
          provide: NgControl,
          useValue: {
            control: new FormControl(''),
          },
        },
      ],
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    inputElement = fixture.nativeElement.querySelector('[testId="input"]');
  });

  it('should create an instance', () => {
    fixture = TestBed.createComponent(TestComponent);
    const directiveEl: DebugElement = fixture.debugElement.query(
      By.directive(TrimDirective)
    );
    const directiveInstance: TrimDirective =
      directiveEl.injector.get(TrimDirective);
    expect(directiveInstance).toBeTruthy();
  });

  it('should update the value of the form control when focus out', () => {
    const testValue: string = '  test  ';
    const trimmedValue: string = 'test';
    const ngControl = TestBed.inject(NgControl);

    inputElement.value = testValue;
    inputElement.dispatchEvent(new Event('focusout'));
    fixture.detectChanges();

    expect(ngControl.control?.value).toBe(trimmedValue);
  });
});
