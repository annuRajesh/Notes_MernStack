import GetInitials from "./GetInitials";

const NavBar = () => {
  const name=GetInitials("Annu Rajesh")
  
  return (
    <>
      <div className="flex flex-row px-2 py-5 shadow-md w-full  bg-BasicBlue">
        <div className="">
          <h1 className="text-3xl">Notes</h1>
        </div>
        <div className="flex flex-row-reverse md:flex-row md:justify-end  justify-start w-full ">
          <div className="rounded-full bg-secondaryYellow text-center  text-black p-5 h-16 w-16">
            <h1>{name}</h1>

          </div>
          <div className="p-4">
            <h1>Annu Rajesh</h1>
            <h2 className="underline">LogOut</h2>
          </div>
        </div>
      </div>
    </>
  );
};
export default NavBar;
