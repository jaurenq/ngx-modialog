import { NgModule }       from '@angular/core';
import { CommonModule }  from '@angular/common';

import { ModalModule } from 'ngx-modialog-11';
import { BootstrapModalModule } from 'ngx-modialog-11/plugins/bootstrap';

import { RuntimeCompiledComponent }   from './runtime-compiled.component';

@NgModule({
  imports: [
    CommonModule,
    ModalModule,
    BootstrapModalModule
  ],
  declarations: [
    RuntimeCompiledComponent
  ],
  entryComponents: [
    RuntimeCompiledComponent
  ],
})
export class RuntimeCompiledModule {

}
