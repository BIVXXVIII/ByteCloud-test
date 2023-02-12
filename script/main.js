// prices

// backblaze.com:
// мінімальний платіж 7$.
// ціна Storage: $0.005.
// ціна Transfer: $0.01.

const backblazeCom = {
    storagePrice: 0.005,
    transferPrice: 0.01,
    minPay: 7
}

//  bunny.net:
// має бути можливість переключатись між опціями HDD та SSD.
// максимальний платіж 10$.
// ціна Storage:
// HDD - $0.01.
// SSD - $0.02.
// ціна Transfer: будь-яка опція - $0.01.


const bunnyNet = {
    options: ["HDD", "SDD"],
    storagePriceHDD: 0.01,
    storagePriceSDD: 0.02,
    transferPrice: 0.01,
    minPay: 10
}

// // scaleway.com:
// має бути можливість переключатись між опціями Multi та Single.
// ціна Storage:
// Multi - 75 GB безкоштовно, потім $0.06.
// Single - 75 GB безкоштовно, потім $0.03.
// ціна Transfer: будь-яка опція - 75 GB безкоштовно, потім $0.02.

const scalewayCom = {}

// vultr.com:
// мінімальний платіж 5$.
// ціна Storage: $0.01.
// ціна Transfer: $0.01.

const vultrCom = {}