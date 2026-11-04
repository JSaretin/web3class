// variable
// condition
// loop
// function


function callMyGuy(help: string){
    let willGive = true;
    if (willGive){
        return 5000
    }
    return 0
}


function recharge(amount: number){
    console.log("bank open")
    let balance = 10_000

    if (balance < amount){
        let remain = amount - balance
        console.log('you need an additional ' + remain)
        const amountReceive = callMyGuy("Afa, I need " + remain)
        balance = balance + amountReceive
    }

    console.log("new balance: " + balance)
}

// let amount = 500
// // console.log(amount)
// console.log("I am a man " + amount)




recharge(15_000)