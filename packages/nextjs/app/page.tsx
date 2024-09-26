"use client";

import { ChangeEvent, useCallback, useEffect, useState } from "react";
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

  const [sellToken, setSellToken] = useState<"eth" | "enc">("eth");
  const [buyToken, setBuyToken] = useState<"eth" | "enc">("enc");

  useEffect(() => {
    sellToken === "enc" ? setBuyToken("eth") : setBuyToken("enc");
  }, [sellToken]);

  const dexContractBalance = useWatchBalance({
    address: dexContractABI[31337].DEX.address,
  });

  const { writeContractAsync: writeDexContractAsync } = useScaffoldWriteContract("DEX");
  const { writeContractAsync: writeEncContractAsync } = useScaffoldWriteContract("EncodeToken");

  const { data: sellFactor = BigInt(1) } = useScaffoldReadContract({
    contractName: "DEX",
    functionName: "getAmountOfTokens",
    args: [
      parseEther("1"),
      dexContractBalance.data?.value,
      (dexContractBalance.data?.value || BigInt(0)) - parseEther("1"),
    ],
  });

  useEffect(() => {
    console.log(sellValue);
    console.log(formatEther(BigInt(sellFactor)));
    console.log("Result of division :", parseFloat(sellValue) / parseFloat(formatEther(BigInt(sellFactor))));
  }, [sellFactor, sellValue]);

  const { data: balanceENC = BigInt(0) } = useScaffoldReadContract({
    contractName: "EncodeToken",
    functionName: "balanceOf",
    args: [connectedAddress],
  });

  const params = {
    eth: {
      address: connectedAddress,
    },
    enc: {
      balance: formatEther(balanceENC),
    },
  };

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
          <span className="text-blue-400">
            {parseFloat(formatEther(sellFactor || BigInt(0))).toFixed(4)} ENC = 1 ETH
          </span>
          <div className="mockup-window bg-base-300 border border-base-100 mt-5">
            <div className="bg-base-200 p-5 pb-8">
              {/* Sell section */}
              <InputSection
                label={"Sell"}
                value={sellValue}
                onChange={customOnChange}
                token={sellToken}
                {...params[sellToken]}
              />

              {/* Switch section */}
              <div className="flex justify-center my-3">
                <ArrowsUpDownIcon
                  className="border border-blue-400 stroke-blue-500 rounded-full p-1.5 w-8 cursor-pointer hover:bg-blue-600 hover:stroke-white"
                  onClick={() => (sellToken === "enc" ? setSellToken("eth") : setSellToken("enc"))}
                />
              </div>

              {/* Sell section */}
              <InputSection
                label="Buy"
                value={
                  sellToken === "eth"
                    ? formatEther(BigInt(sellValue) * BigInt(sellFactor))
                    : (parseFloat(sellValue) / parseFloat(formatEther(BigInt(sellFactor)))).toString() || "0"
                }
                token={buyToken}
                {...params[buyToken]}
              />
            </div>
            <button
              className="p-5 bg-blue-500 hover:bg-blue-600"
              disabled={sellValue === "" || parseFloat(sellValue) === 0}
              onClick={async () => {
                if (sellToken === "eth") {
                  try {
                    await writeDexContractAsync({
                      functionName: "swapEthTotoken",
                      value: parseEther(sellValue),
                    });
                  } catch (e) {
                    console.error("Error swapping eth to token:", e);
                  }
                } else {
                  try {
                    await writeEncContractAsync({
                      functionName: "approve",
                      args: [dexContractABI[31337].DEX.address, parseEther(sellValue)],
                    });
                    await writeDexContractAsync({
                      functionName: "swapTokenToEth",
                      args: [parseEther(sellValue)],
                    });
                  } catch (e) {
                    console.error("Error swapping token to eth:", e);
                  }
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

const InputSection = ({
  value,
  onChange,
  address,
  balance,
  token,
  label,
}: {
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  address?: string;
  balance?: string;
  token: "enc" | "eth";
  label: string;
}) => {
  return (
    <div className="bg-base-300 p-5 rounded-xl">
      <h5 className="text-gray-500 font-extralight">{label}</h5>
      <div className="flex justify-between items-center my-2">
        <input
          className="bg-transparent text-3xl my-2 outline-none"
          type="text"
          placeholder="0.0"
          value={value}
          onChange={onChange}
        />
        <span className="rounded-full px-4 py-1 bg-base-200">{token.toUpperCase()}</span>
      </div>
      <div className="flex justify-between text-gray-500">
        {address ? (
          <Balance address={address} usdMode className="p-0 text-lg" />
        ) : (
          "$ " + (parseFloat(balance || "0") * ENC_PRICE).toFixed(4)
        )}
        <span className="flex">
          <WalletIcon className="w-6 mx-2" />
          {address ? <Balance address={address} className="p-0 text-lg" /> : parseFloat(balance || "0").toFixed(4)}
        </span>
      </div>
    </div>
  );
};

export default Home;
