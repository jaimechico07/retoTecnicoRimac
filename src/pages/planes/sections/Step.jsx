// Step.jsx
const Step = ({ stepActual }) => {
  return (
    <div className="flex flex-col md:flex-row items-center md:justify-center gap-3 bg-[#EDEFFC] py-4 mb-10">
      {/* Step 1 */}
      <div className="flex gap-2">
        <div
          className={`w-6 h-6 flex justify-center items-center border rounded-full ${
            stepActual >= 1
              ? "bg-[#4F4FFF] text-white border-[#4F4FFF]"
              : "bg-white text-gray-600 border-gray-300"
          }`}
        >
          1
        </div>
        <p className={stepActual >= 1 ? " font-semibold" : "text-gray-600"}>
          Planes y coberturas
        </p>
      </div>
      <img src="../../../../public/assets/line.png" className=" w-fit" alt="" />

      {/* Step 2 */}
      <div className="flex gap-2">
        <div
          className={`w-6 h-6 flex justify-center items-center border rounded-full ${
            stepActual >= 2
              ? "bg-[#4F4FFF] text-white border-[#4F4FFF]"
              : "bg-white text-gray-600 border-gray-300"
          }`}
        >
          2
        </div>
        <p className={stepActual >= 2 ? " font-semibold" : "text-gray-600"}>
          Resumen
        </p>
      </div>
    </div>
  );
};

export default Step;
