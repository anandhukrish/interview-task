import { LineChart, PieChart } from "@/components/chart";
import Header from "@/components/layout/header";
import MapCard from "@/components/map-card";
import SummaryCards from "@/components/summary-cards";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/store";
import { getCovidStatus } from "@/store/covid/covid.slice";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.covid);
  useEffect(() => {
    dispatch(getCovidStatus());
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin size-10" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Alert
          variant="destructive"
          className="w-[350px] h-[150px] flex items-center justify-center"
        >
          <AlertTitle className="text-xl  text-center tracking-wide capitalize">
            {error} error
          </AlertTitle>
        </Alert>
      </div>
    );
  }
  return (
    <>
      <Header />
      <main>
        <div className="container mx-auto p-2 flex flex-col">
          <div>
            <h1 className="text-xl md:text-2xl font-bold mb-5">Summary</h1>
            <SummaryCards />
          </div>
          <Separator className="my-5" />
          <div>
            <h1 className="text-xl md:text-2xl font-bold mb-5">Covid Map</h1>
            <MapCard />
          </div>
          <Separator className="my-5" />
          <div className="grid grid-cols-2 gap-5">
            <Card>
              <PieChart />
            </Card>
            <Card>
              <LineChart />
            </Card>
          </div>
        </div>
      </main>
      <footer> footer</footer>
    </>
  );
};

export default Home;
