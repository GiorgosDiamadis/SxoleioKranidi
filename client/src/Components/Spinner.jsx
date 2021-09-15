export default function Spinner({ props }) {
  return (
    <div className=" flex justify-center items-center">
      <div
        className={`${
          props.isLoading === false ? "invisible" : ""
        } animate-spin absolute ml-auto mr-auto left-0 right-0 top-1/2 z-10 rounded-full h-32 w-32 border-b-2 border-blue-500`}
      ></div>
    </div>
  );
}
