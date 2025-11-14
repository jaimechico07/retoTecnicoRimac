import React, { useState } from "react";

import Header from "../../components/Header";
import Step from "./sections/Step";
import Planes from "./sections/Planes";

const Planes_cotizacion = () => {
  const [stepActual, setStepActual] = useState(1);
  return (
    <div>
      <Header />
      <Step stepActual={stepActual} />
      <main>
        <Planes setStepActual={setStepActual} />
      </main>
    </div>
  );
};

export default Planes_cotizacion;
