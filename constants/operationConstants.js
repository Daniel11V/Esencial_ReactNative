export const OPERATIONS_DEFAULT = {
    [Date.now()]: {
        type: 0,
        creationDate: Date.now()
    },
    [Date.now() + 1]: {
        type: 1,
        creationDate: Date.now() + 1,
        accountName: 'Efectivo',
        currencyName: 'ARS',
        initialAmmount: 0
    }
}

// Movimiento
/*
    [Date.now()]: {
        type: 2,
        title: "",
        creationDate: Date.now(),
        from: {
            name: 'Efectivo',
            currency: 'ARS',
            ammount: 0
        },
        sendTo: {
            name: 'Efectivo',
            currency: 'ARS',
            ammount: 0
        },
    }
*/

export const OPERATIONS_TYPES = [
    'Inicio de registros',
    'Creacion de cuenta',
    'Movimiento',
    'Conversión de moneda',
    'Ingreso',
    'Pago',
]