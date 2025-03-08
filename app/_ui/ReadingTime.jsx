import { HiOutlineClock } from "react-icons/hi";

function ReadingTime({ readingTime }) {
  return (
    <div className="flex items-center text-[10px] text-secondary-500">
      <p>
        <HiOutlineClock className="w-4 h-4 stroke-secondary-500 ml-1" />
        <span className="ml-1"> خواندن:</span>
        <span className="ml-1 leading-3">{readingTime} </span>
        <span>دقیقه</span>
      </p>
    </div>
  );
}

export default ReadingTime;
