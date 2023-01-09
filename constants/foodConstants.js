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

export const FOOD_LABELS = [
    {
        name:"pasta"
    },
    {
        name:"tarta"
    },
    {
        name:"minutas"
    },
    {
        name:"ensalada"
    },
    {
        name:"pizza"
    },
    
]
    
    

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
    },
    [Date.now()]: {
        type: 3,
        creationDate: Date.now(),
        accountName: 'Efectivo',
        currencyName: 'ARS',
        finalAmmount: 0
    }
    [Date.now()]: {
        type: 4,
        title: "",
        creationDate: Date.now(),
        sendTo: {
            name: 'Efectivo',
            currency: 'ARS',
            ammount: 0
        },
    },
    [Date.now()]: {
        type: 5,
        title: "",
        creationDate: Date.now(),
        photo: '',
        from: {
            name: 'Efectivo',
            currency: 'ARS',
            ammount: 0
        },
    },
*/

export const OPERATIONS_TYPES = [
    'Inicio de registros', //0
    'Creacion de cuenta',  //1
    'Movimiento',          //2
    'Cierre de cuenta',    //3
    'Ingreso',             //4
    'Pago',                //5
]