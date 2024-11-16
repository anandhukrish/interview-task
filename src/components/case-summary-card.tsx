import React from "react";
import { Card, CardContent, CardTitle } from "./ui/card";

type CaseSummaryCardProps = {
  icon: React.ReactNode;
  title: string;
  count: number;
};

const CaseSummaryCard = ({ icon, title, count }: CaseSummaryCardProps) => {
  return (
    <Card className="gap-3 flex flex-col items-center justify-center p-8">
      <CardTitle className="font-semibold">{title}</CardTitle>
      <CardContent className="p-0">
        <div className="flex items-center justify-center gap-3 flex-col">
          {icon}
          <span>{count}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CaseSummaryCard;
