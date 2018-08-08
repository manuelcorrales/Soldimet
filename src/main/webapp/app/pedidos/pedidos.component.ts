import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'jhi-pedidos',
    templateUrl: './pedidos.component.html',
    styles: []
})
export class PedidosComponent implements OnInit {
    columns = [{ prop: 'name' }, { name: 'Gender' }, { name: 'Company' }];
    rows = [
        { name: 'Austin', gender: 'Male', company: 'Swimlane' },
        { name: 'Dany', gender: 'Male', company: 'KFC' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' }
    ];
    messages = {
        // Message to show when array is presented
        // but contains no values
        emptyMessage: 'No data to display',

        // Footer total message
        totalMessage: 'total'
    };
    limit = 25;
    selectionType = 'single';

    constructor() {}

    ngOnInit() {}
}
