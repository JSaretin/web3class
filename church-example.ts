// variable
// condition
// loop
// function


// interface Member {
//     name: string
//     isMember: boolean
//     phoneNumber: string
// }

// function welcomeNewMember(name: string){
//     console.log("You are welcome in the name of Jesus " + name)
// }

// function getRemainingDrinks(){
//     return 17
// }

// function buyDrinks(amount: number){
//     console.log("process order")
//     return amount / 500
// }

// function giftMalt(member: Member){
//     let totalMalts = getRemainingDrinks()
//     if (totalMalts == 0){
//         totalMalts = totalMalts + buyDrinks(20_000)
//     }
//     console.log("pass drink to " + member.name)
// }

// function attendChurch(member: Member){
//     if (member.isMember != true){
//         welcomeNewMember(member.name)
//         giftMalt(member)
//         collectMemberNumber(member.phoneNumber)
//     }

//     else {
//         briefMember(member)
//     }
// }


// function executeAction(){
//     runErrand("carry malt bottle")
//     attendChurch()
//     runErrand("Buy bread and keep")

// }
















// function pickCall(phoneNumber: string){
//     let voice = getUserVoice();
//     if (voice is not familiar){
//         speakFormal()
//     }
//     else {
//         speakInformal()
//     }
// }


function processOrder(age: number, amount: number){
    console.log("processing order for N" + amount + " for " + age + " old" )
}

function buyWeed(age: number, amount: number){
    const minimumAge = 18
    if (age < minimumAge){
        if (amount > 500_000){
            processOrder(age, amount)
        }
        else{
            throw("You are not old enough " + age)
        }
    }
    else {
        processOrder(age, amount)
    }

}


let people = [
    {
        name: "Ahmad",
        age: 16,
        amount: 20_000
    },
    {
        name: "Precious",
        age: 18,
        amount: 5_000
    },
    {
        name: "Mr Samuel",
        age: 40,
        amount: 1_000
    },
     {
        name: "Clinton",
        age: 13,
        amount: 2_000_000
    }
]



// for each person may day users 
// call buyWeed function


for (const person of people){
    try{
        buyWeed(person.age, person.amount)
    }
    catch(e){
        console.error(e)
    }
}















// function strol(destination: string){
    
// }













// function brushMyTeeth(){
//     let paste = getCurrentPaste()
//     if (paste is not empty){

//     }
//     checkAndPutPasteInBrush()
// }

// function getDress(){
//     wakeUp()
//     brushMyTeeth()
//     takeaShower()
//     dryMyBody()
//     moistMyBody()
    
//     console.log("dressed")
// }


// function walk(target: string){
//     while (I am not yet at the destination){
//         moveOneStepCloser(target)
//     }

//     console.log("arrived at destination")
// }