const Footer = () => {
  return (
    <footer className="bg-black w-full h-auto px-8  xl:h-[10vh]  ">
      <div className="max-w-[1360px] m-auto flex items-center h-full py-4">
        <div className="flex flex-col gap-4 lg:flex-row md:justify-between  items-center w-full ">
          <img src="./assets/Vector.png" alt="logo rimac" />
          <hr className="border-gray-600 border-t w-full lg:hidden" />
          <p className="text-white text-center text-sm">
            © 2025 RIMAC Seguros y Reaseguros.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
