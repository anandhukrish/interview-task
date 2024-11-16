import { Select } from "./ui/select";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setSelect } from "@/store/covid/covid.slice";

const CountrySelect = () => {
  const dispatch = useAppDispatch();
  const { regionalData } = useAppSelector((state) => state.covid);

  const selectOptions = [
    "All States",
    ...regionalData?.map((region) => region.state),
  ];
  return (
    <div>
      <Select
        defaultValue="All States"
        onValueChange={(value) => dispatch(setSelect(value))}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Country" />
        </SelectTrigger>
        <SelectContent align="end">
          {selectOptions.map((option, i) => (
            <SelectItem
              value={option}
              key={`option-${i}`}
              className="SelectContent"
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CountrySelect;
