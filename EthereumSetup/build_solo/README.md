# Config

BitXHub 包括 bitxhub.toml、network.tom 和 order.toml 三个配置文件。
network.toml
[[nodes]]
account = "0x79a1215469FaB6f9c63c1816b45183AD3624bE34"
hosts = ["/ip4/127.0.0.1/tcp/4002/p2p/"]
id = 2
pid = "QmbmD1kzdsxRiawxu7bRrteDgW1ituXupR8GH6E2EUAHY4"

[[nodes]]
account = "0x97c8B516D19edBf575D72a172Af7F418BE498C37"
hosts = ["/ip4/127.0.0.1/tcp/4003/p2p/"]
id = 3
pid = "QmQUcDYCtqbpn5Nhaw4FAGxQaSSNvdWfAFcpQT9SPiezbS"

[[nodes]]
account = "0xc0Ff2e0b3189132D815b8eb325bE17285AC898f8"
hosts = ["/ip4/127.0.0.1/tcp/4004/p2p/"]
id = 4
pid = "QmQW3bFn8XX1t4W14Pmn37bPJUpUVBrBjnPuBZwPog3Qdy"

bitxhub.toml
[[genesis.admins]]
address = "0x79a1215469FaB6f9c63c1816b45183AD3624bE34"
weight = 1
[[genesis.admins]]
address = "0x97c8B516D19edBf575D72a172Af7F418BE498C37"
weight = 1
[[genesis.admins]]
address = "0xc0Ff2e0b3189132D815b8eb325bE17285AC898f8"
weight = 1
