import React from "react";
import Header from "../../components/Header";
import Step from "../planes/sections/Step";
import { useAppStore } from "../../store/useUserStore";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDropleft } from "react-icons/io";

const Resumen = () => {
  const { user, planSeleccionado } = useAppStore();
  const navigate = useNavigate();

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat("es-PE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(precio);
  };

  const handleVolver = () => {
    navigate("/plans");
  };

  return (
    <div>
      <Header />
      <Step stepActual={2} />
      <main className="max-w-[1360px] m-auto px-4 py-8">
        <div
          onClick={handleVolver}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 font-semibold"
        >
          <IoIosArrowDropleft size={20} />
          <span>Volver</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-16">
          Resumen del seguro
        </h1>

        <div className="bg-white rounded-lg shadow-md p-8 ">
          <div className="mb-8 pb-6 border-b border-gray-200">
            <h2 className="text-sm font-bold text-gray-600 mb-4">
              PRECIOS CALCULADOS PARA
            </h2>
            {user && (
              <div className="flex items-center gap-3">
                <img src="../../assets/gl_family-24x24.png" alt="" />
                <div>
                  <p className="font-bold text-xl text-gray-800">
                    {user.name} {user.lastName}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mb-8 pb-6 ">
            {user && (
              <div className="text-sm flex flex-col gap-2">
                <h2 className="text-lg font-bold">Responsable de Pago</h2>
                <p>
                  <span className="font-semibold">DNI:</span> {user.documento}
                </p>
                <p>
                  <span className="font-semibold">Celular:</span> {user.celular}
                </p>
              </div>
            )}
          </div>

          <div>
            {planSeleccionado ? (
              <div className="text-sm flex flex-col gap-2">
                <h2 className="text-lg font-bold">Plan Elegido</h2>
                <p className="">{planSeleccionado.name}</p>
                <p className="">
                  Costo del Plan: ${formatearPrecio(planSeleccionado.price)} al
                  mes
                </p>
              </div>
            ) : (
              <p className="text-gray-500 italic">No hay plan seleccionado</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Resumen;
