import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from 'app/shared/util/datepicker-adapter';
import { SoldimetSharedLibsModule, SoldimetSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from 'app/shared';

@NgModule({
    imports: [SoldimetSharedLibsModule, SoldimetSharedCommonModule],
    declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    entryComponents: [JhiLoginModalComponent],
    exports: [SoldimetSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetSharedModule {}
