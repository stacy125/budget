export const currencyFormatter = new Intl.NumberFormat(undefined, {
    currency: "usd",
    style: "currency",
    minimumFractionDigits: 0 //gives whole value with no decimals
})

//this is a number formatter 
//undefined set to the user local