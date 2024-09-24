"use client";

import { ChangeEvent, useCallback, useState } from "react";
import Image from "next/image";
import coins from "../assets/coins.png";
import dexContractABI from "../contracts/deployedContracts";
import type { NextPage } from "next";
import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";
import { ArrowsUpDownIcon, WalletIcon } from "@heroicons/react/24/solid";
import { Balance } from "~~/components/scaffold-eth";
import { useScaffoldReadContract, useScaffoldWriteContract, useWatchBalance } from "~~/hooks/scaffold-eth";

const ENC_PRICE = 12;

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [sellValue, setSellValue] = useState<string>("");

  const dexContractBalance = useWatchBalance({
    address: dexContractABI[31337].DEX.address,
  });

  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("DEX");
  const { data: buyValue } = useScaffoldReadContract({
    contractName: "DEX",
    functionName: "getAmountOfTokens",
    args: [
      parseEther(sellValue),
      dexContractBalance.data?.value,
      (dexContractBalance.data?.value || BigInt(0)) - parseEther(sellValue),
    ],
  });

  const { data: balanceENC = BigInt(0) } = useScaffoldReadContract({
    contractName: "EncodeToken",
    functionName: "balanceOf",
    args: [connectedAddress],
  });

  const customOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const re = /^(\d+(\.\d*)?|\.\d+)$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setSellValue(e.target.value || "");
    }
  }, []);

  return (
    <>
      <div className="container mx-auto flex flex-col justify-center">
        <div className="text-center my-14">
          <h1 className="font-mono font-semibold text-3xl">Swap anytime, anywhere, any token</h1>
          <span className="text-xs text-white/50">...Almost</span>
        </div>
        <div className="w-2/3 lg:w-1/3 m-auto">
          <h1 className="text-4xl font-bold">Trade</h1>
          <span className="text-blue-400">1.66 ENC = 1 ETH</span>
          <div className="mockup-window bg-base-300 border border-base-100 mt-5">
            <div className="bg-base-200 p-5 pb-8">
              <div className="bg-base-300 p-5 rounded-xl">
                <h5 className="text-gray-500 font-extralight">Sell</h5>
                <div className="flex justify-between items-center my-2">
                  <input
                    className="bg-transparent text-3xl my-2 outline-none"
                    type="text"
                    placeholder="0.0"
                    value={sellValue}
                    onChange={customOnChange}
                  />
                  <select className="rounded-full h-10 px-4 border-r-8 border-transparent bg-base-200">
                    <option>ETH</option>
                    <option>ENC</option>
                  </select>
                </div>
                <div className="flex justify-between text-gray-500">
                  <Balance address={connectedAddress} usdMode className="p-0 text-lg" />
                  <span className="flex">
                    <WalletIcon className="w-6 mx-2" />
                    <Balance address={connectedAddress} className="p-0 text-lg" />
                  </span>
                </div>
              </div>
              <div className="flex justify-center my-3">
                <ArrowsUpDownIcon className="border border-blue-400 stroke-blue-500 rounded-full p-1.5 w-8 cursor-pointer hover:bg-blue-600 hover:stroke-white" />
              </div>
              <div className="bg-base-300 p-5 rounded-xl">
                <h5 className="text-gray-500 font-extralight">Buy</h5>
                <div className="flex justify-between items-center my-2">
                  <input
                    className="bg-transparent text-3xl my-2 outline-none text-gray-400"
                    type="text"
                    value={formatEther(buyValue || BigInt(0))}
                    placeholder="0.0"
                    readOnly
                  />
                  <select className="rounded-full h-10 px-4 border-r-8 border-transparent bg-base-200">
                    <option>ENC</option>
                    <option>ETH</option>
                  </select>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>$ {(parseFloat(formatEther(balanceENC)) * ENC_PRICE).toFixed(4)}</span>
                  <span className="flex">
                    <WalletIcon className="w-6 mx-2" /> {parseFloat(formatEther(balanceENC)).toFixed(4)}
                  </span>
                </div>
              </div>
            </div>
            <button
              className="p-5 bg-blue-500 hover:bg-blue-600"
              disabled={sellValue === "" || parseFloat(sellValue) === 0}
              onClick={async () => {
                try {
                  await writeYourContractAsync({
                    functionName: "swapEthTotoken",
                    value: parseEther(sellValue),
                  });
                } catch (e) {
                  console.error("Error setting greeting:", e);
                }
              }}
            >
              Swap
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-12">
        <Image className="w-1/3 lg:w-1/5" alt="coins" src={coins} />
      </div>
    </>
  );
};

export default Home;
