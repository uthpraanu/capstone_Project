
const SettleTrade = ({state})=>{
    const settleATrade = async (event)=>{
        event.preventDefault();
        const {contract} = state;
        const idValue = document.querySelector("#idValue").value;

        const transaction = await contract.settleTrade(idValue);
        await transaction.wait();
    }

    return <>
        <form onSubmit={settleATrade}>
            <h1>Settle a Trade</h1>
            <label>Trade Id to Settle</label>
            <input type="text" id="idValue" placeholder='Enter the tradeID to settle'></input>
            <button type='submit'>Click to Settle</button>
        </form>
    </>
}

export default SettleTrade;