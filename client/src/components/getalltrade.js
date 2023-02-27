import { useState} from 'react';

const GetAllTradeIT = ({state})=>{
    const [s,sUse] = useState([]);

    const getTradeDetails = async (event)=>{
        event.preventDefault();
        const {contract} = state;
        const tradeID = document.querySelector("#tradeId").value;

        const arr = await contract.listAllTrades();
        const amt = [];
        /*amt.push(arr[0]._hex);
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
        amt.push("\t------\t");*/
       
        arr.forEach(arr1 => {
            let side=[];
            side.push(arr1[0]._hex);
            side.push(["\t------\t"]);
            side.push(arr1[1]);
            side.push(["\t------\t"]);
            side.push(arr1[2]);
            side.push(["\t------\t"]);
            side.push(parseInt(arr1[3]._hex));
            side.push(["\t------\t"]);
            if (arr1[4]===false)
            {
                side.push("unsettled");
                
            }
            else
            {
                side.push("settled");
            }
            side.push(["\t------\t"]);
            side.push(arr1[5]._hex);

            amt.push(side);
            
            amt.push("=============\t\t");
            
        }); sUse(amt);
        
        //console.log(arr);
        
    }

  
    return (<div>
        <h1>see all trade</h1>
        <button onClick= {getTradeDetails}>See all transactions</button>
          
        <h3>Trade Details</h3>
        <h5>TradeID------------------------------------Sender------------------------------------------------------------------------------------Receiver---------------------------------------------Amount--------Status-------------TimeStamp------------------</h5>      
            <div>
                {s.map((item)=>{
                    return item;
                })}
                
            </div>
    </div>);
}

export default GetAllTradeIT;