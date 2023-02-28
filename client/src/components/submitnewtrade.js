import {ethers} from 'ethers';
import {useState} from 'react';

const Trader= ({state}) => {
    const [errorIT,seterror]=useState(false);
    const [errorITName,setErrorITName] = useState("An Un-expected error has occured");
    const [display, setDisplay] = useState("");
    const [styleIT,setStyleIT] = useState({
        color : "yellow"
    });

const start=async (event)=>{
    event.preventDefault();
    
    const {contract} = state;
    const sendToAddress = document.querySelector("#receiver").value;
    const sendAmount= document.querySelector("#amount").value;

    console.log("The transaction is happening fine : ",sendToAddress," : ",sendAmount);
    try
    {
    seterror(false);
    const transaction = await contract.createTrade(sendToAddress,sendAmount);
    setStyleIT(({
        color : "yellow"
    }));
    setDisplay("Please Wait");
    
    await transaction.wait();
    await console.log(transaction);
    await seterror(false);
    await setDisplay("Your transaction is sucessfull with tradeId : ");
    await setStyleIT(({
        color : "green"
    }));
    setErrorITName("");
    }
    catch(e)
    {
        setStyleIT(({
            color : "red"
        }));
        if(e.reason === "execution reverted: Please enter a value greater than 0"){
            setErrorITName("You have enterned the amount zero, It's not allowed !!!");
        }
        else if(e.argument === "name"){
            setErrorITName("You have enterned the wrong address of receiver, We can't peform this transaction");
        }
        else if(e.argument === "amountReceived"){
            setErrorITName("You have enterned the amount less than zero, It's not allowed !!!");
        }
        else if(e.reason === "user rejected transaction"){
            setErrorITName("Your rejected the transaction on metamask, So trade not created");
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
    <div style={styleIT}>
    {
        errorIT?<h1 id="displayColour">{errorITName}</h1>:<h1 id="displayColour">{display}</h1> 
    }
    </div>
</>
}

export default Trader ;