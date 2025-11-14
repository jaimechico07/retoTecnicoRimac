import { create } from 'zustand'

export const useAppStore = create((set, get) => ({
  // Estado de usuario
  user: null,
  
  // Estado de planes
  planes: [],
  planesOriginales: [],
  planSeleccionado: null,
  tipoSeleccion: null,
  cargandoPlanes: false,
  errorPlanes: null,
  
  // Estado de UI
  seleccionPlan: null,

  // Acciones de usuario
  validateAndSetUser: async (numeroDocumento, celular, checksAceptados = {}) => {
    try {
      if (!numeroDocumento || !celular) {
        return { success: false, error: "Por favor, complete ambos campos: documento y celular" };
      }
      if (!checksAceptados.terminos || !checksAceptados.politicas) {
        return {
          success: false,
          error: "Debe aceptar los términos y condiciones y las políticas de privacidad",
        };
      }

      const response = await fetch("https://rimac-front-end-challenge.netlify.app/api/user.json");
      if (!response.ok) throw new Error("Error al validar usuario");
      const userData = await response.json();

      const usuariosMock = [
        {
          ...userData,
          documento: "30216147",
          celular: "5130216147",
          age: get().calcularEdad(userData.birthDay),
        },
        {
          name: "Carlos",
          lastName: "Pérez Gómez",
          birthDay: "15-08-1985",
          age: get().calcularEdad("15-08-1955"),
          documento: "87654321",
          celular: "5198765432",
        },
      ];

      const usuarioEncontrado = usuariosMock.find(
        (u) => u.documento === numeroDocumento && u.celular === celular
      );

      if (usuarioEncontrado) {
        set({ user: usuarioEncontrado });
        return { success: true, user: usuarioEncontrado };
      }

      return { success: false, error: "No se encontró un usuario con ese documento y celular" };
    } catch (err) {
      console.error("validateAndSetUser error:", err);
      return { success: false, error: "Error de conexión. Intente nuevamente." };
    }
  },

  // Acciones de planes
  cargarPlanes: async () => {
    const { user, seleccionPlan } = get();
    
    if (!user) {
      set({ errorPlanes: "Usuario no validado" });
      return;
    }

    set({ cargandoPlanes: true, errorPlanes: null });
    
    try {
      const response = await fetch(
        "https://rimac-front-end-challenge.netlify.app/api/plans.json"
      );
      if (!response.ok) throw new Error("Error al cargar los planes");
      
      const data = await response.json();
      const planesFiltrados = data.list.filter((plan) => user.age <= plan.age);
      
      set({ 
        planesOriginales: planesFiltrados,
        planes: get().aplicarPrecioPlanes(planesFiltrados, seleccionPlan)
      });

    } catch (err) {
      set({ errorPlanes: err.message });
    } finally {
      set({ cargandoPlanes: false });
    }
  },

  // Helper functions
  calcularEdad: (fechaNacimiento) => {
    try {
      const [dia, mes, anio] = fechaNacimiento.split("-").map(Number);
      const fechaNac = new Date(anio, mes - 1, dia);
      const hoy = new Date();

      let edad = hoy.getFullYear() - fechaNac.getFullYear();
      const mesActual = hoy.getMonth();
      const diaActual = hoy.getDate();
      if (mesActual < mes - 1 || (mesActual === mes - 1 && diaActual < dia)) {
        edad--;
      }
      return edad;
    } catch {
      return 0;
    }
  },

  aplicarDescuento: (precio) => precio * 0.95,

  aplicarPrecioPlanes: (planes, seleccion) => {
    return planes.map(plan => ({
      ...plan,
      price: seleccion === "para-alguien-mas" ? get().aplicarDescuento(plan.price) : plan.price
    }));
  },

  setSeleccionPlan: (seleccion) => {
    const { planesOriginales } = get();
    set({ 
      seleccionPlan: seleccion,
      planes: get().aplicarPrecioPlanes(planesOriginales, seleccion)
    });
  },

  setPlanSeleccionado: (plan) => set({ planSeleccionado: plan }),

  clearUser: () => set({ user: null, planSeleccionado: null, planes: [] })
}));