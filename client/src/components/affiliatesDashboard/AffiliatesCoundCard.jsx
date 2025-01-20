import { FaHandshake } from "react-icons/fa";
import { PiHandDepositBold, PiHandWithdrawBold } from "react-icons/pi";
import { BiTransferAlt } from "react-icons/bi";
import CAStatesCard from "./CAStatesCard";

const AffiliatesCoundCard = () => {
  const stats = [
    {
      title: "Deposit Balance",
      amount: 0,
      Icon: PiHandDepositBold,
      bgColor: "bg-gradient-to-t from-red-600 to-black",
      // " bg-[#3c8dbc]",
    },
    {
      title: "my order",
      amount: 0,
      Icon: PiHandWithdrawBold,
      bgColor: "bg-gradient-to-t from-red-600 to-black",
      // "bg-[#00a65a]",
    },
    {
      title: "Due Amount",
      amount: 0,
      Icon: FaHandshake,
      bgColor: "bg-gradient-to-t from-red-600 to-black",
      // "bg-[#f39c12]",
    },
    {
      title: "Paid Amount",
      amount: 0,
      Icon: BiTransferAlt,
      bgColor: "bg-gradient-to-t from-red-600 to-black",
      // "bg-[#dd4b39]",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <CAStatesCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default AffiliatesCoundCard;
