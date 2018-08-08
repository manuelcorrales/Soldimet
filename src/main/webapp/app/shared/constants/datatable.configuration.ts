export const DT_OPTIONS = {
    pagingType: 'full_numbers',
    pageLength: 10,
    dom: 'Bfrtip',
    language: {
        url: 'assets/i18n/ES/es.json'
    },
    colReorder: true,
    // Configure the buttons
    buttons: [
        {
            extend: 'collection',
            text: '<i class="fa fa-cogs" aria-hidden="true"></i>',
            buttons: [
                {
                    extend: 'pageLength'
                },
                {
                    extend: 'colvis',
                    text: 'Mostrar/Ocultar'
                },
                {
                    extend: 'colvisRestore',
                    text: 'Restaurar'
                }
            ]
        },
        {
            extend: 'copy',
            text: '<i class="fa fa-clipboard" aria-hidden="true"></i>'
        },
        {
            extend: 'pdf',
            text: '<i class="fa fa-file-pdf-o" aria-hidden="true"></i>'
        },
        {
            extend: 'print',
            text: '<i class="fa fa-print" aria-hidden="true"></i>'
        },
        {
            extend: 'excel',
            text: '<i class="fa fa-file-excel-o" aria-hidden="true"></i>'
        },
        {
            extend: 'csv',
            text: '<i class="fa fa-file-text-o" aria-hidden="true"></i>'
        }
    ]
};
