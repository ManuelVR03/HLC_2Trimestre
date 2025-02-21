import { Directive, ElementRef, forwardRef, HostListener, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: 'ion-input',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomIonInputDirective),
      multi: true,
    },
  ],
})
export class CustomIonInputDirective implements ControlValueAccessor {
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  writeValue(value: any): void {
    this.renderer.setProperty(this.el.nativeElement, 'value', value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @HostListener('ionInput', ['$event.target.value'])
  onInput(value: any): void {
    this.onChange(value);
  }

  @HostListener('blur')
  onBlur(): void {
    this.onTouched();
  }
}
