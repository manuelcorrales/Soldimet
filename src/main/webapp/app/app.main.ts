import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ProdConfig } from 'app/blocks/config/prod.config';
import { SoldimetAppModule } from 'app/app.module';

ProdConfig();

if (module['hot']) {
  module['hot'].accept();
}

platformBrowserDynamic()
  .bootstrapModule(SoldimetAppModule, { preserveWhitespaces: true })
  // eslint-disable-next-line no-console
  .then(success => console.log('Application started'))
  .catch(err => console.error(err));
