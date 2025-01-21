import AffiliatesAllProduct from "../../components/affiliatesDashboard/AffiliatesAllProduct";
import AffiliatesCoundCard from "../../components/affiliatesDashboard/AffiliatesCoundCard";
import AffiliatesDashboardTable from "../../components/affiliatesDashboard/AffiliatesDashboardTable";

const AffiliatesHome = () => {
  return (
    <section className="
    p-[20px]">
      <div>
      <AffiliatesCoundCard />
      <div className="bg-[#222222] py-2 my-4">
        <h1 className="text-2xl font-bold text-center text-white">
         Watch This Videos
        </h1>
      </div>
      <AffiliatesAllProduct />
      <AffiliatesDashboardTable />
      <div className="bg-[#222222] py-2 mt-4">
        <h1 className="text-2xl font-bold text-center text-white">
          Copy Right @ 2025 BY Oracle Technology LLC
        </h1>
      </div>
    </div>
    </section>
  );
};

export default AffiliatesHome;
