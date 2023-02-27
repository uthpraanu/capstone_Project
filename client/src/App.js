import abi from './contract/Trade.json';
import {useState,useEffect} from 'react';
import {ethers} from 'ethers';
import Newtrade from './components/submitnewtrade';
import Getalltrade from './components/getalltrade';
import Gettradebyid from './components/gettradebyid';
import Settle from './components/settletrade';

function App() {
  const [state,setState]=useState(
    { provider:null,
      signer:null,
      contract:null
    }
  )
  
  useEffect(()=>{
  const connectwallet=async ()=>{
    const contractAddress="0xb199C87b0f8ACc73B38d8443752bb8817a6ED938";
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
      <Newtrade state={state}></Newtrade>
      <hr></hr>
      <hr></hr>
      <Gettradebyid state={state}></Gettradebyid>
      <hr></hr>
      <hr></hr>
      <Settle state={state}></Settle>
      <hr></hr>
      <hr></hr>
      <Getalltrade state={state}></Getalltrade>
      <hr></hr>
      <hr></hr>
    </>
  );
}

export default App;