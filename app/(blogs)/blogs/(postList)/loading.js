import Spinner from "@/app/_components/Spinner";

function Loading() {
  return (
    <div className="flex justify-center items-center h-[70vh]">
      <Spinner />
    </div>
  );
}

export default Loading;
