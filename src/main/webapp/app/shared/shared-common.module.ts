import { NgModule } from '@angular/core';

import { SoldimetSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from 'app/shared';

@NgModule({
    imports: [SoldimetSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [SoldimetSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class SoldimetSharedCommonModule {}
