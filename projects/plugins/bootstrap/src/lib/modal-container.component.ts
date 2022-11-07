import {
  Component,
  ElementRef,
  ViewEncapsulation,
  Renderer2
} from '@angular/core';

import { BaseDynamicComponent, DialogRef } from 'ngx-modialog-14';

import { MessageModalPreset } from './presets/message-modal-preset';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bs-modal-container',
  host: {
    'tabindex': '-1',
    'role': 'dialog',
    'class': 'modal fade',
    'style': 'position: absolute; display: block'
  },
  encapsulation: ViewEncapsulation.None,
  template:
      `
    <div [ngClass]="dialog.context.dialogClass"
         [class.modal-lg]="dialog.context.size == \'lg\'"
         [class.modal-sm]="dialog.context.size == \'sm\'">
      <div class="modal-content" style="display:block" role="document" overlayDialogBoundary>
        <ng-content></ng-content>
      </div>
    </div>`
})
// tslint:disable-next-line:component-class-suffix
export class BSModalContainer extends BaseDynamicComponent {
  constructor(public dialog: DialogRef<MessageModalPreset>,
              el: ElementRef, renderer: Renderer2) {
    super(el, renderer);
    this.activateAnimationListener();
  }
}
