import {ethers} from 'ethers';
import {useState} from 'react';
const Trader= ({state}) => {
    const [errorIT,seterror]=useState(false);
    const [errorITName,setErrorITName] = useState("An Un-expected error has occured");
    const [display, setDisplay] = useState("");

const start=async (event)=>{
    event.preventDefault();
    
    const {contract} = state;
    const sendToAddress = document.querySelector("#receiver").value;
    const sendAmount= document.querySelector("#amount").value;

    console.log("The transaction is happening fine : ",sendToAddress," : ",sendAmount);
    try
    {
    const transaction = await contract.createTrade(sendToAddress,sendAmount);
    setDisplay("Please Wait");
    
    await transaction.wait();
    await console.log(transaction);
    await seterror(false);
    await setDisplay("Your transaction is sucessfull with tradeId : ");
    setErrorITName("");
    }
    catch(e)
    {
        if(e.reason === "execution reverted: Please enter a value greater than 0"){
            setErrorITName("You have enterned the amount zero, It's not allowed !!!");
        }
        else if(e.argument === "name"){
            setErrorITName("You have enterned the wrong address of receiver, We can't peform this transaction");
        }
        else if(e.argument === "amountReceived"){
            setErrorITName("You have enterned the amount less than zero, It's not allowed !!!");
        }
        seterror(true);
    }
    //const id=await contract.getrecenttransaction();
    //await console.log(id);
    
}
return <>
    <h1>Let's Create a new trade</h1>
    <form onSubmit={start}>
        <label>Enter address of receiver</label>
        <input type="text" id='receiver' placeholder='enter address'></input>
        <label>Enter amount to send</label>
        <input type="number" id='amount' placeholder='enter amount'></input>
        <button type='Submit'>Make a Trade</button>
    </form>
    {
        errorIT?<h1>{errorITName}</h1>:<h1>{display}</h1> 
    }
    
</>
}

export default Trader ;