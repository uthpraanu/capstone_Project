// SPDX-License-Identifier: GPL-3.0

pragma solidity = 0.8.17;

contract Trade{

    // Structure code for the Trade Transaction.
    struct TradeStruct{
        uint tradeId;
        address from;
        address to;
        uint amount;
        bool status;
        uint timestamp;
    }

    mapping(uint => TradeStruct) private tradeLedger;
    TradeStruct [] private tradeRegistry; 
    uint private tradeCounter;
    
    constructor() public{
        tradeCounter = 1;
    }

    
    function createTrade(address sender, uint amountReceived) public {
        require(amountReceived > 0, "Please enter a value greater than 0");

        TradeStruct memory t = TradeStruct({
            tradeId : tradeCounter,
            from : msg.sender,
            to : sender,
            amount : amountReceived,
            status : false,
            timestamp : block.timestamp});

        tradeLedger[tradeCounter] =t;
        tradeRegistry.push(t);
        tradeCounter += 1;
    }

    function retrunLatest() public view returns(uint send){
        send = tradeCounter - 1;
    }

    function getTradeById(uint tradeIdReceived) public view returns(uint tradeId, 
                                                address from, 
                                                address to,
                                                uint amount,
                                                bool status,
                                                uint timestamp){
        require(tradeIdReceived > 0, "Your enterd tradeId is not valid");
        require(tradeIdReceived < tradeCounter, "Your enterd tradeId is not valid");
        TradeStruct memory t = tradeLedger[tradeIdReceived];
        tradeId = t.tradeId;
        from = t.from;
        to = t.to;
        amount = t.amount;
        status = t.status;
        timestamp = t.timestamp;
    }

    function settleTrade(uint tradeIdReceived) public{
        require(tradeIdReceived > 0, "Your enterd tradeId is not valid");
        require(tradeIdReceived < tradeCounter, "Your enterd tradeId is not valid");
        require(tradeLedger[tradeIdReceived].from == msg.sender, "You are not authorized to settle this trade");

        tradeLedger[tradeIdReceived].status = true; 
        tradeRegistry[tradeIdReceived-1]=tradeLedger[tradeIdReceived];
    }
    
    function listAllTrades() public view returns(TradeStruct[] memory)
    {
        return(tradeRegistry);
    } 

}