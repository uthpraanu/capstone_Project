import { useState, useEffect } from "react";

const SettleTrade = ({state})=>{
    const [errorOccured, setErrorOccured] = useState(false);
    const [display, setDisplay] = useState("");
    const [normalDisplay, setNormalDisplay] = useState("");

    const settleATrade = async (event)=>{
        event.preventDefault();
        const {contract} = state;
        const idValue = document.querySelector("#idValue").value;

        try{
            setNormalDisplay("Please Wait");
            const transaction = await contract.settleTrade(idValue);
            await transaction.wait();
            setErrorOccured(false);
            await setNormalDisplay("Status updated Sucessfully");
            await console.log("Transactin finished");
        }
        catch(error){
            if(error.reason === "execution reverted: Your enterd tradeId is not valid" || error.reason === "value out-of-bounds" || error.reason === "invalid BigNumber string"){
                setDisplay("Enter a valid tradeId");
            }
            else if(error.reason === ""){
                setDisplay("You are not authorized to settle this trade");
            }
            console.log(error.reason);
            setErrorOccured(true);
        }
    }

    return <>
        <form onSubmit={settleATrade}>
            <h1>Settle a Trade</h1>
            <label>Trade Id to Settle</label>
            <input type="text" id="idValue" placeholder='Enter the tradeID to settle'></input>
            <button type='submit'>Click to Settle</button>
        </form>
        <div>
            <h1>{errorOccured?display:normalDisplay}</h1>
        </div>
    </>
}

export default SettleTrade;