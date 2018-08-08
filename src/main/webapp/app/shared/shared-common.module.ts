import { NgModule } from '@angular/core';

import { SoldimetSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [SoldimetSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [SoldimetSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class SoldimetSharedCommonModule {}
