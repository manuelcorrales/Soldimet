import { NgModule, LOCALE_ID } from '@angular/core';
import { DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import locale from '@angular/common/locales/en';
import localeEsAr from '@angular/common/locales/es-AR';

@NgModule({
    imports: [HttpClientModule],
    exports: [],
    declarations: [],
    providers: [
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'es-Ar'
        },
        DatePipe
    ]
})
export class SoldimetCoreModule {
    constructor() {
        registerLocaleData(locale);
        registerLocaleData(localeEsAr);
    }
}
