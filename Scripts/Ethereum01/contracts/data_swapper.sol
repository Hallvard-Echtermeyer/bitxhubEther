pragma solidity >=0.5.6;

contract DataSwapper {
    mapping(string => string) dataM; // map for accounts
    // change the address of Broker accordingly
    address BrokerAddr = 0x74b7bC65bC2A65C564d2CB999917b6B0722F4B16;
    BrokerSwapper broker = BrokerSwapper(BrokerAddr);

    event Logger(string message);
    // AccessControl
    modifier onlyBroker() {
        require(msg.sender == BrokerAddr, "Invoker are not the Broker");
        _;
    }

    // contract for data exchange
    function getData(string memory key) public returns (string memory) {
        emit Logger("We get into getData");
        return dataM[key];
    }

    function get(
        address destChainID,
        string memory destAddr,
        string memory key
    ) public {
        emit Logger("We get into get");
        broker.emitInterchainEvent(
            destChainID,
            destAddr,
            "interchainGet,interchainSet,",
            key,
            key,
            ""
        );
    }

    function set(string memory key, string memory value) public {
        emit Logger("We get into set");
        dataM[key] = value;
    }

    function interchainSet(string memory key, string memory value)
        public
        onlyBroker
    {
        emit Logger("We get into interchainSet");
        set(key, value);
    }

    function interchainGet(string memory key)
        public
        onlyBroker
        returns (bool, string memory)
    {
        emit Logger("We get into interchainGet");
        return (true, dataM[key]);
    }
}

contract BrokerSwapper {
    function emitInterchainEvent(
        address destChainID,
        string memory destAddr,
        string memory funcs,
        string memory args,
        string memory argscb,
        string memory argsrb
    ) public;
}
