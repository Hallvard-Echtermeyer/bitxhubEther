pragma solidity >=0.5.6;

contract DataSwapper {
    mapping(string => string) dataM; // map for accounts
    // change the address of Broker accordingly
    address BrokerAddr = 0xBE1d4b2D250a270f690e1721FC0b719E3392bFdA;
    BrokerSwapper broker = BrokerSwapper(BrokerAddr);

    event Logger(string message);
    event Timer(string where, uint256 time);
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
        emit Timer("set", block.timestamp);
        dataM[key] = value;
    }

    function interchainSet(string memory key, string memory value)
        public
        onlyBroker
    {
        emit Timer("interchainSet", block.timestamp);
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
