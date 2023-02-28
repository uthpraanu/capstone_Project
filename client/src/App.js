import abi from './contract/Trade.json';
import {useState,useEffect} from 'react';
import {ethers} from 'ethers';
import FreshTrade from './components/createTrade';
import GetTradeList from './components/getTradeList';
import GetTradeById from './components/getTradeById';
import SettleTrade from './components/settleTrade';

function App() {
  const [state,setState]=useState(
    { provider:null,
      signer:null,
      contract:null
    }
  )
  
  useEffect(()=>{
  const connectwallet=async ()=>{
    const contractAddress="0x385689B23ab5c2cD21EEa0e31a05743df0d163Af";
    const contractABI=abi.abi;

    try{
      const {ethereum} = window;
      
      if(ethereum){
        ethereum.request({method:"eth_requestAccounts"});
      }

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress,contractABI,signer);

      setState({provider,signer,contract});

    }
    catch(error){
      console.log(error);
    }

  }
connectwallet();

},[]);
  
  
  
  return (
    <>
      <hr></hr>
      <hr></hr>
      <FreshTrade state={state}></FreshTrade>
      <hr></hr>
      <hr></hr>
      <GetTradeById state={state}></GetTradeById>
      <hr></hr>
      <hr></hr>
      <SettleTrade state={state}></SettleTrade>
      <hr></hr>
      <hr></hr>
      <GetTradeList state={state}></GetTradeList>
      <hr></hr>
      <hr></hr>
    </>
  );
}

export default App;