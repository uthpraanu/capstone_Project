import {ethers} from 'ethers';
import {useState} from 'react';
const Trader= ({state}) => {
    const [errorIT,seterror]=useState(false);

const start=async (event)=>{
    event.preventDefault();
    
    const {contract} = state;
    const sendToAddress = document.querySelector("#receiver").value;
    const sendAmount= document.querySelector("#amount").value;

    console.log("The transaction is happening fine : ",sendToAddress," : ",sendAmount);
    try
    {
    const transaction = await contract.createTrade(sendToAddress,sendAmount);
    
    await transaction.wait();
    console.log(transaction);
    }
    catch(error)
    {
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
        errorIT?<h3>Sorry Your transaction has failed due to the following reasons <br></br>*You must have entered a wrong sender address <br></br>*you must have entered amount as string<br></br>*you must have entered amount smaller than or equalt to zero</h3>:null  
        }
    
</>
}

export default Trader ;