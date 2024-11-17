import CountrySelect from "../country-select";

const Header = () => {
  return (
    <header>
      <div className=" container mx-auto flex justify-between items-center py-5 px-2 sm:px-0">
        <h1 className="text-xl md:text-2xl font-bold uppercase">
          Covid Summary
        </h1>
        <CountrySelect />
      </div>
    </header>
  );
};

export default Header;
