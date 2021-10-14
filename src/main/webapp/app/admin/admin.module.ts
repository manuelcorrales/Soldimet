import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SoldimetSharedModule } from 'app/shared/shared.module';
/* jhipster-needle-add-admin-module-import - JHipster will add admin modules imports here */

import { adminState } from 'app/admin/admin.route';
import { AuditsComponent } from 'app/admin/audits/audits.component';
import { UserMgmtComponent } from 'app/admin/user-management/user-management.component';
import { UserMgmtDetailComponent } from 'app/admin/user-management/user-management-detail.component';
import { UserMgmtUpdateComponent } from 'app/admin/user-management/user-management-update.component';
import { UserMgmtDeleteDialogComponent } from 'app/admin/user-management/user-management-delete-dialog.component';
import { LogsComponent } from 'app/admin/logs/logs.component';
import { JhiMetricsMonitoringComponent } from 'app/admin/metrics/metrics.component';
import { JhiHealthModalComponent } from 'app/admin/health/health-modal.component';
import { JhiHealthCheckComponent } from 'app/admin/health/health.component';
import { JhiConfigurationComponent } from 'app/admin/configuration/configuration.component';
import { JhiDocsComponent } from 'app/admin/docs/docs.component';

import { JhiFlagsComponent } from './flags/flags.component';

@NgModule({
  imports: [
    SoldimetSharedModule,
    /* jhipster-needle-add-admin-module - JHipster will add admin modules here */
    RouterModule.forChild(adminState),
  ],
  declarations: [
    AuditsComponent,
    UserMgmtComponent,
    UserMgmtDetailComponent,
    UserMgmtUpdateComponent,
    UserMgmtDeleteDialogComponent,
    LogsComponent,
    JhiConfigurationComponent,
    JhiHealthCheckComponent,
    JhiHealthModalComponent,
    JhiFlagsComponent,
    JhiDocsComponent,
    JhiMetricsMonitoringComponent,
  ],
  entryComponents: [UserMgmtDeleteDialogComponent, JhiHealthModalComponent],
})
export class SoldimetAdminModule {}
