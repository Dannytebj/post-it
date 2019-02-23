import { Directive,
        ComponentFactoryResolver,
        ComponentRef,
        Input,
        OnInit,
        ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../shared/interfaces/field.interface';
import { InputComponent } from './../commons/input/input.component';
import { ButtonComponent } from './../commons/button/button.component';

const componentMapper = {
  input: InputComponent,
  button: ButtonComponent
};

@Directive({
  selector: '[appDynamicField]'
})
export class DynamicFieldDirective implements OnInit {
@Input() field: FieldConfig;
@Input() group: FormGroup;
componentRef: any;
  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) { }
  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(
      componentMapper[this.field.type]
    );
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.group = this.group;
  }

}
