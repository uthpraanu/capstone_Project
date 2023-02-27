import { useState} from 'react';

const GetAllTradeIT = ({state})=>{
    const [s,sUse] = useState([]);
    const [executedProperly,setExecutedProperly] = useState(false);
    const [messageIT, setMessageIT] = useState("");
    const getTradeDetails = async (event)=>{
        event.preventDefault();
        const {contract} = state;
        const tradeID = document.querySelector("#tradeId").value;

        try{
            const arr = await contract.getTradeById(tradeID);
            setMessageIT("Please Wait");
            const amt = [];
            amt.push(arr[0]._hex);
            amt.push("\t------\t");
            amt.push(arr[1]);
            amt.push("\t------\t");
            amt.push(arr[2]);
            amt.push("\t------\t");
            amt.push(parseInt(arr[3]._hex));
            amt.push("\t------\t");
            if(arr[4] === false){
                amt.push("NOT Settled");
            }
            else{
                amt.push("Settled");
            }
            amt.push("\t------\t");
            amt.push(parseInt(arr[5]._hex));
            amt.push("\t------\t");
            sUse(amt);
            setExecutedProperly(true);
        }
        catch(error){
            setExecutedProperly(false);
            setMessageIT("Your enterd tradeId is not valid");
        }
    }

  
    return (<div>
        <h1>Get a trade</h1>
        <form onSubmit={getTradeDetails}>
            <label>Trade Id to find </label>
            <input type="text" id="tradeId" placeholder='Enter the trade ID'></input>
            <button type='submit'>Click to Get details</button>
        </form>
        <h3>Trade Details</h3>
        <h5>TradeID------------------------------------Sender------------------------------------------------------------------------------------Receiver---------------------------------------------Amount--------Status-------------TimeStamp------------------</h5>      
            <div>
                {executedProperly?s.map((item)=>{
                    return(item)
                }):<h1>{messageIT}</h1>}
                
            </div>
    </div>);
}

export default GetAllTradeIT;