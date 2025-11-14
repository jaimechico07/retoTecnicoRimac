import { FaPhone } from "react-icons/fa6";

const Header = () => {
  return (
    <>
      <header className="max-w-[1360px] m-auto py-6 px-8 h-[10vh] ">
        <div className="flex justify-between">
          <figure>
            <img
              className="w-[73px] h-9"
              src="../../public/assets/Logo.png"
              alt="logo rimac"
            />
          </figure>
          <p></p>
          <div className="flex gap-4 items-center ">
            <p className="text-xs font-semibold hidden md:block">
              ¡Compra por este medio!
            </p>
            <FaPhone />
            <a href="tel:(01) 411 6001" className="font-bold text-lg">
              (01) 411 6001
            </a>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
