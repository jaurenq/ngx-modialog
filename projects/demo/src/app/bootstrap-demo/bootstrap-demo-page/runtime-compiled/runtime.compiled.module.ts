import { NgModule }       from '@angular/core';
import { CommonModule }  from '@angular/common';

import { ModalModule } from 'ngx-modialog-14';
import { BootstrapModalModule } from 'ngx-modialog-14/plugins/bootstrap';

import { RuntimeCompiledComponent }   from './runtime-compiled.component';

@NgModule({
    imports: [
        CommonModule,
        ModalModule,
        BootstrapModalModule
    ],
    declarations: [
        RuntimeCompiledComponent
    ]
})
export class RuntimeCompiledModule {

}
