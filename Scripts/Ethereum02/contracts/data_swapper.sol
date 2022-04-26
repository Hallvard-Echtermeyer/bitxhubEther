pragma solidity >=0.5.6;

contract DataSwapper {
    mapping(string => string) dataM; // map for accounts
    // change the address of Broker accordingly
    address BrokerAddr = 0x2C25595DF2657E088bC2bB40963d599ebB9Aad70;
    BrokerSwapper broker = BrokerSwapper(BrokerAddr);

    event Logger(string message);

     event Timer(
        string where,
        uint256 time
    );

    // AccessControl
    modifier onlyBroker() {
        require(msg.sender == BrokerAddr, "Invoker are not the Broker");
        _;
    }

    // contract for data exchange
    function getData(string memory key) public returns (string memory) {
        emit Timer("getData02", block.timestamp);
        return dataM[key];
    }

    function get(
        address destChainID,
        string memory destAddr,
        string memory key
    ) public {
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
        emit Logger("We get into set02");
        dataM[key] = value;
    }

    function interchainSet(string memory key, string memory value)
        public
        onlyBroker
    {
        emit Logger("We get into interchainSet02");
        set(key, value);
    }

    function interchainGet(string memory key)
        public
        onlyBroker
        returns (bool, string memory)
    {
        emit Logger("We get into interchainGet02");
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
