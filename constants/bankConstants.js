export const BANKS_DEFAULT = {
    "Efectivo": {
        name: "Efectivo",
        creationDate: Date.now(),
        accounts: {
            "ARS": {
                currency: "ARS",
                ammount: 0,
                category: "uso diario",
                creationDate: Date.now(),
            }
        }
    }
}

/*

moneyRegisters = {            // In Firebase
    [UNIQUE FIREBASE ID]: {
        name: "Vicky y Yo",
        participants: {
            [UNIQUE FIREBASE ID]: {
                name: user.name,
                email: user.email,
                photoUrl: user.photoUrl,
                accessLevel: 0,
            },
        },
        banks: {...BANKS_DEFAULT}
        operations: {...OPERATIONS_DEFAULT}
    },
}

const user = {     // In Firebase
    personalMoneyRegisterId = UNIQUE FIREBASE ID
    availableMoneyRegisters = [
        {
            id: UNIQUE FIREBASE ID,
            name: ''
        },
    ]
}

const user = {
    isAuth: false,
    id: '',
    name: '',
    email: '',
    photoUrl: '',
    accessToken: '',
}

const money = {
    availableRegisters: {
        [moneyRegisterId]: {
            id: UNIQUE FIREBASE ID,
            name: ''
        },
    }
    currentRegisterId: '', // UNIQUE FIREBASE ID
    personalRegisterId: '', // UNIQUE FIREBASE ID
    currentRegister: {
        name: '',
        banks: {},
        operations: {},
        participants: {
            [UNIQUE FIREBASE ID]: {
                email: user.email,
                name: user.name,
                photoUrl: user.photoUrl,
                accessLevel: 0,
            },
        },
    },
    notifications: {
        [UNIQUE FIREBASE ID]: {

        }
    }
    loadingFirstView: true,
}

const ACCESS_LEVEL_WORD = [
    "Propietario",
    "Editor",
    "Lector",
]
*/

/*

NOTIFICATIONS = {
    [UNIQUE FIREBASE ID]: {
        type: "Invitation to Money Register",
        moneyRegister: {
            id: "",
            name: "",
            accessLevel: 0,
        },
        sendToEmail,
        from: {
            name: user.name,
            email: user.email,
        }
    }
}



*/


export const ACCOUNTS_CATEGORIES = [
    "uso diario",
    "ahorro / inversion",
    "emergencia"
]

export const CURRENCIES = [
    {
        name: "ARS",
        price: 1,
    },
    {
        name: "USD",
        price: 100,
    },
    {
        name: "EUR",
        price: 150,
    },
    {
        name: "BTC",
        price: 10000000,
    }
]

export const BANKS_INFO = [
    {
        name: "Efectivo",
        imgUrl: "https://images.vexels.com/media/users/3/200982/isolated/preview/5830c3a552a6cfc31b5d1f995397e294-mano-con-mano-de-icono-de-dinero.png",
        // https://img2.freepng.es/20180412/kaw/kisspng-money-computer-icons-cash-flow-payment-kuala-lumpur-5acfd75e50eb93.0371477115235705263315.jpg
    },
    {
        name: "Santander",
        imgUrl: "https://diariofinanciero.com/wp-content/uploads/2018/04/Santander-nuevo-logo.jpg",
    },
    {
        name: "Banco Macro",
        imgUrl: "https://play-lh.googleusercontent.com/H4Wm-u7pH8WSOeHyUB5x0ajvBTuwzqX7kL6yVn5itTmUowOeciIA7UIgB8iUscofSA",
    },
    {
        name: "Banco Galicia",
        imgUrl: "data:image/png;base64,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",
    },
    {
        name: "Banco Nación",
        imgUrl: "https://w7.pngwing.com/pngs/169/504/png-transparent-el-banco-de-la-nacion-argentina-bank-transaction-account-bank-blue-text-logo.png",
    },
    {
        name: "Banco Provincia",
        imgUrl: "https://pbs.twimg.com/profile_images/1444980645868998660/8soVrtfK_400x400.jpg",
    },
    {
        name: "Brubank",
        imgUrl: "data:image/png;base64,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",
    },
    {
        name: "Mercado Pago",
        imgUrl: "https://pbs.twimg.com/profile_images/1467852001673363459/0IR57HDN_400x400.jpg",
    },
    {
        name: "Invertir Online",
        imgUrl: "https://media-exp1.licdn.com/dms/image/C4D0BAQF0K7vVNwPemQ/company-logo_200_200/0/1626697626791?e=2159024400&v=beta&t=TjS7eg940YJAx-rgdujo81FvgbBAx7TDCwr06-PIYJM",
    },
    {
        name: "Uala",
        imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBp36wLMf_jzCTp138vSvQQ2AtyrUojk58cE2Ylz7CRMdpG6d29tuSAVA5PohsyMUGiJo&usqp=CAU",
    },
    {
        name: "Default",
        imgUrl: "https://image.shutterstock.com/image-vector/wallet-icon-vector-template-flat-260nw-1387299707.jpg"
    }
]