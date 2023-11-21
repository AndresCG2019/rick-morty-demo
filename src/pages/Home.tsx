import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import {
  listaPersonajesModel,
  personajeModel,
} from "../models/personajes.model";
import ListadoPersonajes from "../components/ListadoPersonajes";
import UltimosVistos from "../components/UltimosVistos";
import { Button, Input } from "reactstrap";
import toast, { toastConfig } from "react-simple-toasts";
import "react-simple-toasts/dist/theme/dark.css";
import ModalDetallesPersonaje from "../components/ModalDetallesPersonaje";

export interface IHomePageProps {}

const Home = () => {
  const [listaPersonajes, setListaPersonajes] =
    useState<listaPersonajesModel>();

  const [ultimosPersonajesVistos, setUltimosPersonajesVistos] = useState<
    personajeModel[]
  >([]);

  const [personajeSeleccionado, setPersonajeSeleccionado] =
    useState<personajeModel>();

  const [nombreBuscar, setNombreBuscar] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [modal, setModal] = useState(false);

  toastConfig({ theme: "dark" });

  useEffect(() => {
    obtenerPersonajes(1);
  }, []);

  const toggle = () => setModal(!modal);

  async function obtenerPersonajes(page: number, busquedaCancelada?: boolean) {
    try {
      setLoading(true);

      let url: string = "";

      if (busquedaCancelada) {
        url = `https://rickandmortyapi.com/api/character/?page=${page}`;
      } else {
        url = `https://rickandmortyapi.com/api/character/?page=${page}${
          nombreBuscar && `&name=${nombreBuscar}`
        }`;
      }

      const respuesta: AxiosResponse<listaPersonajesModel> = await axios.get(
        url
      );

      setListaPersonajes(respuesta.data);
      setLoading(false);
    } catch (error: any) {
      if (error.response.status == 404) {
        toast("Sin resultados...");
        cancelarBusqueda();
      }
      setLoading(false);
    }
  }

  async function cancelarBusqueda() {
    setNombreBuscar("");
    await obtenerPersonajes(1, true);
  }

  function seleccionarPersonaje(id: number) {
    const personaje: personajeModel | undefined = listaPersonajes?.results.find(
      (x) => x.id == id
    );

    if (!personaje) return;

    let ultimosVistosTemp: personajeModel[] = ultimosPersonajesVistos;

    if (!ultimosPersonajesVistos.find((x) => x.id == personaje.id)) {
      personaje.ordenVisto = ultimosVistosTemp.length + 1;

      if (ultimosVistosTemp.length < 5) {
        ultimosVistosTemp.push(personaje);
        setUltimosPersonajesVistos(ultimosVistosTemp);
      } else {
        ultimosVistosTemp.forEach((x) => (x.ordenVisto = x.ordenVisto! - 1));
        personaje.ordenVisto = 5;
        ultimosVistosTemp.push(personaje);
        ultimosVistosTemp = ultimosVistosTemp.filter((x) => x.ordenVisto != 0);
        setUltimosPersonajesVistos(ultimosVistosTemp);
      }
    }

    setPersonajeSeleccionado(personaje);
    setModal(true);
  }

  function seleccionarPersonajeUltimosVistos(id: number) {
    const personaje: personajeModel | undefined = listaPersonajes?.results.find(
      (x) => x.id == id
    );

    if (!personaje) return;

    setPersonajeSeleccionado(personaje);
    setModal(true);
  }

  return (
    <div className="container-fluid mt-3">
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="row">
            <div className="col-12 col-md-8 mb-2">
              <Input
                id="nombre"
                name="nombre"
                placeholder="Nombre"
                type="text"
                value={nombreBuscar}
                onChange={(e) => setNombreBuscar(e.target.value)}
              />
            </div>
            <div className="col-12 col-md-2">
              <Button color="secondary" onClick={() => obtenerPersonajes(1)}>
                Buscar
              </Button>
            </div>
            <div className="col-12 col-md-2">
              <Button color="warning" onClick={() => cancelarBusqueda()}>
                Cancelar
              </Button>
            </div>
          </div>

          {loading && <span>Cargando...</span>}
          <h2>Personajes</h2>
          <ListadoPersonajes
            listaPersonajes={listaPersonajes}
            onClickPage={obtenerPersonajes}
            onClickPersonaje={seleccionarPersonaje}
          />
        </div>
        <div className="col-12 col-md-6 mt-5">
          <h2>Últimos vistos</h2>
          <UltimosVistos
            listaPersonajes={ultimosPersonajesVistos}
            onClickPersonaje={seleccionarPersonajeUltimosVistos}
          />
        </div>
      </div>
      <ModalDetallesPersonaje
        isOpen={modal}
        toggle={toggle}
        personajeSeleccionado={personajeSeleccionado}
      />
    </div>
  );
};

export default Home;
