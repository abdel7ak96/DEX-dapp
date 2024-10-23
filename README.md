# DEX Protocol

## 📄 Description

This project is an implementation of a decentralized exchange protocol _(similar to [Sushi swap](https://www.sushi.com/))_.

A decentralised exchange is a trading platform that operates without a central authority, allowing users to trade directly with one another. This model enhances privacy, reduces risks of hacking, and minimizes reliance on intermediaries, promoting a fair trading environment.

## 🖥️ Demonstration

![image](https://github.com/user-attachments/assets/d7c552a6-59ae-4163-af61-9a3b8bd904a2)

## 🔖 Smart contracts

| Smart contract | Purpose                                                                                                                          |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| DEX            | implements a decentralized exchange (DEX) allowing users to add and remove liquidity, as well as swap between ETH and ENC token. |
| ENC            | ERC20 Token                                                                                                                      |

## ℹ️ How to run locally

1. On a separate Terminal, run a hardhat network _(keep this terminal up)_

```
yarn chain
```

2. Open a new terminal and deploy the smart contracts by running

```
yarn deploy
```

3. After the deploy, run the webapp using

```
yarn start
```

## 📚 Techstack

The project is based on the [scafford-eth-2](https://github.com/scaffold-eth/scaffold-eth-2).

- Nextjs
- RainbowKit
- Hardhat
- Wagmi
- Viem
- TypeScript
