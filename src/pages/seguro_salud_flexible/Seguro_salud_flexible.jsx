import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Hero from "./sections/Hero";

const seguro_salud_flexible = () => {
  return (
    <>
      <div className="relative">
        <Header />
        <main className="container m-auto px-6 md:px-0">
          <Hero />
          <img
            src="../../../public/assets/blur-asset.png"
            className="absolute left-0 bottom-0 -z-10 h-full max-h-screen w-auto object-cover"
            alt=""
          />
          <img
            src="../../../public/assets/blur-asset (1).png"
            className="absolute right-0 top-0 -z-10 h-full max-h-screen w-auto object-cover"
            alt=""
          />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default seguro_salud_flexible;
