"use client"
import { ConnectMultiButton } from "bitcoin-wallet-adapter";
import InnerMenu from "./InnerMenu";

const WalletButton = () => {

  

  return (
    <div className="mt-2">
  <ConnectMultiButton
    walletImageClass="w-[60px]"
    walletLabelClass="pl-3 font-bold text-xl ml-2"
    walletItemClass="border w-full md:w-6/12 cursor-pointer border-transparent rounded-xl mb-4 hover:border-green-500 transition-all"
    headingClass="text-white text-4xl pb-12 font-bold text-center"
    buttonClassname="bg-gradient-to-r from-[#1c22ff] to-[#0a10f7] hover:from-[#4251ff] hover:to-[#1c22ff] rounded-lg flex items-center text-white px-4 py-1 mb-4 font-bold"
    InnerMenu={InnerMenu}
    icon=""
    iconClass=""
    // balance={1000}
  />
</div>

  );
};

export default WalletButton;
