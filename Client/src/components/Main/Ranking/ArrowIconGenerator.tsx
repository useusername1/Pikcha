import {
  TiArrowSortedUp as UpIcon,
  TiArrowSortedDown as DownIcon,
} from "react-icons/ti";
import { BsDash as DashIcon } from "react-icons/bs";

interface ArrowIconGeneratorProps {
  difference: number;
  numberOpt?: boolean;
}

const ArrowIconGenerator = ({
  difference,
  numberOpt = true,
}: ArrowIconGeneratorProps) => {
  if (difference === 0)
    return (
      <>
        <DashIcon className="dash-icon" />
      </>
    );
  if (difference > 0)
    return (
      <>
        <UpIcon className="up-icon" />
        {numberOpt && difference}
      </>
    );
  if (difference < 0)
    return (
      <>
        <DownIcon className="down-icon" />
        {numberOpt && Math.abs(difference)}
      </>
    );
  return <></>;
};

export default ArrowIconGenerator;
