import { combineLatest } from 'rxjs';
import { Injectable } from '@angular/core';

import {
  ContainerContent,
  Overlay,
  DialogRef,
  Modal as Modal_,
  CSSBackdrop,
  PromiseCompleter
} from 'ngx-modialog-14';

import { BSModalContainer } from './modal-container.component';

import { OneButtonPresetBuilder } from './presets/one-button-preset';
import { TwoButtonPresetBuilder, PromptPresetBuilder } from './presets/two-button-preset';

// TODO: use DI factory for this.
// TODO: consolidate dup code
const isDoc: boolean = !(typeof document === 'undefined' || !document);

let animationClass = 'show';

/**
 * Execute this method to flag that you are working with Bootstrap version 4.
 * @deprecated From version 5, ngx-modialog's bootstrap plugin is set to work with version 4 of bootstrap by default.
 */
export function bootstrap4Mode(): void {
}

/**
 * Execute this method to flag that you are working with Bootstrap version 3.
 */
export function bootstrap3Mode(): void {
  animationClass = 'in';
}

@Injectable()
export class Modal extends Modal_ {
  constructor(overlay: Overlay) {
    super(overlay);
  }

  alert(): OneButtonPresetBuilder {
    return new OneButtonPresetBuilder(this, <any>{isBlocking: false});
  }

  prompt(): PromptPresetBuilder {
    return new PromptPresetBuilder(this, <any>{isBlocking: true, keyboard: null});
  }

  confirm(): TwoButtonPresetBuilder {
    return new TwoButtonPresetBuilder(this, <any>{isBlocking: true, keyboard: null});
  }

  protected create(dialogRef: DialogRef<any>, content: ContainerContent): DialogRef<any> {

    const backdropRef = this.createBackdrop(dialogRef, CSSBackdrop);
    const containerRef = this.createContainer(dialogRef, BSModalContainer, content);

    const overlay = dialogRef.overlayRef.instance;
    const backdrop = backdropRef.instance;
    const container = containerRef.instance;

    dialogRef.inElement ? overlay.insideElement() : overlay.fullscreen();

    // add body class if this is the only dialog in the stack
    if (isDoc && !document.body.classList.contains('modal-open')) {
      document.body.classList.add('modal-open');
    }


    if (dialogRef.inElement) {
      backdrop.setStyle('position', 'absolute');
    }
    backdrop.addClass('modal-backdrop fade', true);

    backdrop.addClass(animationClass);
    container.addClass(animationClass);

    if (containerRef.location.nativeElement) {
      containerRef.location.nativeElement.focus();
    }

    overlay.beforeDestroy(() => {
      const completer = new PromiseCompleter<void>();
      backdrop.removeClass(animationClass);
      container.removeClass(animationClass);

      combineLatest.call(backdrop.myAnimationEnd$(), container.myAnimationEnd$(), (s1, s2) => [s1, s2])
        .subscribe(sources => {
          if (isDoc && this.overlay.groupStackLength(dialogRef) === 1) {
            document.body.classList.remove('modal-open');
          }

          completer.resolve();
        });

      return completer.promise;
    });

    return dialogRef;
  }
}
