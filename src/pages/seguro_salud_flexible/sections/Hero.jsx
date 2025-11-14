import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../../store/useUserStore";

const Hero = () => {
  const [tipoDocumento, setTipoDocumento] = useState("DNI");
  const [numeroDocumento, setNumeroDocumento] = useState("30216147");
  const [celular, setCelular] = useState("5130216147");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [commsAccepted, setCommsAccepted] = useState(false);
  const [errores, setErrores] = useState({
    documento: "",
    celular: "",
    checkboxes: "",
  });
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();
  const validateAndSetUser = useAppStore((s) => s.validateAndSetUser);

  const tiposDocumento = [
    { value: "DNI", label: "DNI" },
    { value: "RUC", label: "RUC" },
  ];

  const validarFormulario = () => {
    const nuevosErrores = {
      documento: "",
      celular: "",
      checkboxes: "",
    };

    let esValido = true;

    // Validar documento
    if (!numeroDocumento.trim()) {
      nuevosErrores.documento = "El número de documento es obligatorio";
      esValido = false;
    } else if (numeroDocumento.length < 8) {
      nuevosErrores.documento = "El documento debe tener al menos 8 caracteres";
      esValido = false;
    }

    // Validar celular
    if (!celular.trim()) {
      nuevosErrores.celular = "El número de celular es obligatorio";
      esValido = false;
    } else if (celular.length < 9) {
      nuevosErrores.celular = "El celular debe tener al menos 9 caracteres";
      esValido = false;
    }

    // Validar checkboxes
    if (!privacyAccepted || !commsAccepted) {
      nuevosErrores.checkboxes = "Debe aceptar ambas políticas para continuar";
      esValido = false;
    }

    setErrores(nuevosErrores);
    return esValido;
  };

  const limpiarErrores = () => {
    setErrores({
      documento: "",
      celular: "",
      checkboxes: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    limpiarErrores();

    if (!validarFormulario()) {
      return;
    }

    setCargando(true);

    try {
      const checksAceptados = {
        terminos: privacyAccepted,
        politicas: commsAccepted,
      };

      const resultado = await validateAndSetUser(
        numeroDocumento,
        celular,
        checksAceptados
      );

      if (resultado.success) {
        navigate("/plans");
        console.log({
          tipoDocumento,
          numeroDocumento,
          celular,
          privacyAccepted,
          commsAccepted,
          user: resultado.user,
        });
      } else {
        // Error del servidor/API
        setErrores((prev) => ({
          ...prev,
          documento: resultado.error,
        }));
      }
    } catch (error) {
      setErrores((prev) => ({
        ...prev,
        documento: "Error de conexión. Intente nuevamente.",
      }));
      console.error("Error:", error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="py-8 grid md:grid-cols-2 md:place-content-center md:place-items-start w-fit gap-16 m-auto md:h-[calc(100vh-20vh)] mb-20 xl:mb-0">
      <img
        className="rounded-3xl md:block hidden max-h-screen w-auto object-cover"
        src="../../../../public/assets/image_220.png"
        alt=""
      />
      <div className="flex flex-col justify-center gap-4 md:max-w-[352px]">
        <div className="py-4 md:py-0 border-b border-gray-300 md:border-0 ">
          <div className="grid grid-cols-2  items-center ">
            <figure className="col-start-2 col-end-3 row-start-1 row-end-2 place-items-end ">
              <source
                srcSet="../../../../public/assets/image_220.png"
                type="image/web"
                media="(max-width:768px)"
              />
              <img
                className="rounded-3xl max-w-[136px] md:hidden block"
                src="../../../../public/assets/image_220.png"
                alt=""
              />
            </figure>
            <div className="col-start-1 col-end-2 md:col-end-3 row-start-1 row-end-2">
              <p className="font-bold text-sm bg-linear-to-r from-[#00F4E2] to-[#00FF7F] w-fit px-3 py-1 rounded-sm mb-2">
                Seguro Salud Flexible
              </p>
              <h1 className="font-bold text-[32px] leading-none">
                Creado para ti y tu familia
              </h1>
            </div>
          </div>
        </div>
        <p className="font-semibold text-sm ">
          Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra
          asesoría. 100% online.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Documento Field */}
          <div>
            <div
              className={`flex rounded-lg border w-full ${
                errores.documento ? "border-red-500" : "border-gray-300"
              }`}
            >
              <div className="relative w-[180px] border-r">
                <select
                  value={tipoDocumento}
                  onChange={(e) => setTipoDocumento(e.target.value)}
                  className="px-2 w-full appearance-none h-full outline-none"
                >
                  {tiposDocumento.map((tipo) => (
                    <option key={tipo.value} value={tipo.value}>
                      {tipo.label}
                    </option>
                  ))}
                </select>
                <IoIosArrowDown className="absolute right-4 top-5 pointer-events-none " />
              </div>
              <div className="w-full px-3 py-1">
                <span className="text-xs text-[#5E6488]">
                  Nro. de documento
                </span>
                <input
                  type="text"
                  value={numeroDocumento}
                  onChange={(e) => {
                    setNumeroDocumento(e.target.value);
                    if (errores.documento) limpiarErrores();
                  }}
                  className="w-full border-none outline-none"
                  // placeholder="Ingrese su documento"
                />
              </div>
            </div>
            {errores.documento && (
              <p className="text-red-500 text-xs mt-1">{errores.documento}</p>
            )}
          </div>

          {/* Celular Field */}
          <div>
            <div
              className={`rounded-lg border w-full px-3 py-1 ${
                errores.celular ? "border-red-500" : "border-gray-300"
              }`}
            >
              <span className="text-xs text-[#5E6488]">Celular</span>
              <input
                type="text"
                value={celular}
                onChange={(e) => {
                  setCelular(e.target.value);
                  if (errores.celular) limpiarErrores();
                }}
                className="w-full border-none outline-none"
                // placeholder="Ingrese su celular"
              />
            </div>
            {errores.celular && (
              <p className="text-red-500 text-xs mt-1">{errores.celular}</p>
            )}
          </div>

          {/* Checkboxes */}
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={privacyAccepted}
                onChange={(e) => {
                  setPrivacyAccepted(e.target.checked);
                  if (errores.checkboxes) limpiarErrores();
                }}
                className="w-4 h-4 font-medium accent-black"
              />
              <span className="text-xs text-gray-700">
                Acepto la Política de Privacidad
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={commsAccepted}
                onChange={(e) => {
                  setCommsAccepted(e.target.checked);
                  if (errores.checkboxes) limpiarErrores();
                }}
                className="w-4 h-4 font-medium accent-black"
              />
              <span className="text-xs text-gray-700">
                Acepto la Política de Comunicaciones Comerciales
              </span>
            </label>

            {errores.checkboxes && (
              <p className="text-red-500 text-xs mt-1">{errores.checkboxes}</p>
            )}
          </div>

          <p className="text-xs font-semibold text-start underline">
            Aplican Términos y Condiciones.
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={cargando}
            className="bg-black text-xl text-white py-5 px-10 rounded-[40px] cursor-pointer w-full md:w-auto font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cargando ? "Validando..." : "Cotiza aquí"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Hero;
