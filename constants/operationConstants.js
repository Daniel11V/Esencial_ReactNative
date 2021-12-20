export const OPERATIONS_DEFAULT = {
    [Date.now()]: {
        type: 0,
        creationDate: Date.now()
    },
    [Date.now()]: {
        type: 1,
        creationDate: Date.now(),
        accountName: 'Efectivo',
        currencyName: 'ARS',
        initialAmmount: '0'
    }
}

export const OPERATIONS_TYPES = [
    'Inicio de registros',
    'Creacion de cuenta',
    'Movimiento',
    'Conversión de moneda',
    'Ingreso',
    'Pago',
]