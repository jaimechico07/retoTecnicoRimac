import React, { useState } from "react";
import { IoCheckmark } from "react-icons/io5";
import { TbPointFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../../store/useUserStore";
import { IoIosArrowDropleft } from "react-icons/io";

const Planes = () => {
  const [seleccion, setSeleccion] = useState(null);
  const navigate = useNavigate();

  const {
    user,
    planes,
    cargandoPlanes,
    errorPlanes,
    cargarPlanes,
    setSeleccionPlan,
    setPlanSeleccionado,
  } = useAppStore();

  const opciones = [
    {
      id: "para-mi",
      titulo: "Para mí",
      descripcion:
        "Cotiza tu seguro de salud y agrega familiares si así lo deseas.",
      icono: "../../../public/assets/IcProtectionLight.png",
    },
    {
      id: "para-alguien-mas",
      titulo: "Para alguien más",
      descripcion:
        "Realiza una cotización para uno de tus familiares o cualquier persona.",
      icono: "../../../public/assets/IcAddUserLight.png",
    },
  ];

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat("es-PE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(precio);
  };

  const manejarSeleccion = async (id) => {
    setSeleccion(id);
    setSeleccionPlan(id);

    if (planes.length === 0) {
      await cargarPlanes();
    }
  };

  const manejarSeleccionPlan = (plan) => {
    setPlanSeleccionado(plan);
    navigate("/resume");
  };

  const handleVolver = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="max-w-[1360px] m-auto px-4">
        <div
          onClick={handleVolver}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 font-semibold"
        >
          <IoIosArrowDropleft size={20} />
          <span>Volver</span>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {user
              ? `${user.name} ¿Para quién deseas cotizar?`
              : "¿Para quién deseas cotizar?"}
          </h1>
          <p className="text-gray-600">
            Selecciona la opción que se ajuste más a tus necesidades.
          </p>
        </div>

        <div className="max-w-[600px] grid grid-cols-1 gap-y-4 md:grid-cols-2 place-items-center place-content-center m-auto">
          {opciones.map((opcion) => (
            <div
              key={opcion.id}
              onClick={() => manejarSeleccion(opcion.id)}
              className={`relative w-full md:max-w-[250px] p-6 bg-white rounded-xl border-3 border-solid shadow-sm transition-all duration-200 hover:shadow-md cursor-pointer ${
                seleccion === opcion.id
                  ? "border-black border-3"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <div className="flex flex-col">
                <img src={opcion.icono} className="w-fit" alt={opcion.titulo} />
                <div className="text-left">
                  <h3 className="font-semibold text-lg">{opcion.titulo}</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {opcion.descripcion}
                  </p>
                </div>
              </div>
              <div
                className={`w-6 h-6 absolute flex justify-center items-center top-4 right-4 rounded-full border ${
                  seleccion === opcion.id
                    ? "bg-green-600 border-green-500"
                    : "border-gray-400"
                }`}
              >
                {seleccion === opcion.id && (
                  <IoCheckmark className="text-white text-lg font-bold" />
                )}
              </div>
            </div>
          ))}
        </div>

        {seleccion && (
          <div className="mt-12 mb-12">
            {cargandoPlanes && (
              <div className="text-center py-8">
                <p className="text-gray-600">Cargando planes...</p>
              </div>
            )}

            {errorPlanes && (
              <div className="text-center py-8">
                <p className="text-red-600">Error: {errorPlanes}</p>
                <button
                  onClick={cargarPlanes}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                  Reintentar
                </button>
              </div>
            )}

            {!cargandoPlanes && !errorPlanes && planes.length > 0 && (
              <div>
                <div className="flex flex-wrap gap-6 max-w-5xl mx-auto justify-around">
                  {planes.map((plan) => (
                    <div
                      key={plan.name}
                      className="border flex bg-white shadow-md flex-col w-[288px] justify-between border-gray-200 rounded-xl px-8 py-16 hover:shadow-lg transition-shadow duration-200"
                    >
                      <div className="border-b border-gray-200 pb-4 mb-4 flex gap-4 items-start">
                        <div>
                          <h3 className="font-bold text-2xl text-gray-800">
                            {plan.name}
                          </h3>
                          <p className="text-[#7981B2] text-sm font-semibold mt-1">
                            COSTO DEL PLAN
                          </p>
                          {seleccion === "para-alguien-mas" && (
                            <span className="text-sm text-[#7981B2]  line-through">
                              ${plan.price} antes
                            </span>
                          )}
                          <p className="text-xl font-bold text-gray-900 mt-2">
                            ${formatearPrecio(plan.price)} al mes
                          </p>
                        </div>
                        <img
                          src="../../../../public/assets/IcHospitalLight.png"
                          alt=""
                        />
                      </div>

                      <ul className="space-y-3">
                        {plan.description.map((beneficio, index) => (
                          <li key={index} className="flex gap-6 items-start">
                            <TbPointFilled className="text-xl" />
                            {beneficio}
                          </li>
                        ))}
                      </ul>

                      <button
                        onClick={() => manejarSeleccionPlan(plan)}
                        className="w-full mt-6 bg-[#FF1C44] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                      >
                        Seleccionar Plan
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Planes;
