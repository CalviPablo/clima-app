require("dotenv").config();

const {
  leerInput,
  inquirerMenu,
  pausa,
  listarLugares,
} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {
  const busquedas = new Busquedas();
  let opt;

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case 1:
        // Mostrar mensaje
        const termino = await leerInput("Ciudad:");
        // Buscar lugares
        const lugares = await busquedas.ciudad(termino);

        // Seleccionar lugar
        const id = await listarLugares(lugares);
        const lugarSel = lugares.find((l) => l.id === id);

        // Clima
        const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);
        console.log(clima);

        // Mostrar resultados
        console.log("\nInformacion de la ciudad\n");
        console.log("Ciudad:", lugarSel.nombre);
        console.log("Lat:", lugarSel.lat);
        console.log("Lng:", lugarSel.lng);
        console.log("Temperatura:", clima.temp);
        console.log("Minima:", clima.min);
        console.log("Maxima:", clima.max);
        console.log("Como esta el clima:", clima.desc.green);
        break;
    }

    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();
