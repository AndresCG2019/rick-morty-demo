import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { listaPersonajesModel } from "../models/personajes.model";
import ListadoPersonajes from "../components/ListadoPersonajes";
import UltimosVistos from "../components/UltimosVistos";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

export interface IHomePageProps {}

const Home = () => {
  const [listaPersonajes, setListaPersonajes] =
    useState<listaPersonajesModel>();

  const [loading, setLoading] = useState<boolean>(false);

  async function obtenerPersonajes(page: number) {
    try {
      setLoading(true);

      const respuesta: AxiosResponse<listaPersonajesModel> = await axios.get(
        `https://rickandmortyapi.com/api/character/?page=${page}`
      );

      setListaPersonajes(respuesta.data);
      setLoading(false);
    } catch (error) {
      console.log("Algo salio mal...");
      setLoading(false);
    }
  }

  useEffect(() => {
    obtenerPersonajes(1);
  }, []);

  return (
    <div className="container-fluid mt-3">
      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col mb-2">
              <Input
                id="nombre"
                name="nombre"
                placeholder="Nombre"
                type="text"
              />
            </div>
            <div className="col">
              <Button>Buscar</Button>
            </div>
          </div>

          {loading && <span>Cargando...</span>}
          <ListadoPersonajes
            listaPersonajes={listaPersonajes}
            onClickPage={obtenerPersonajes}
          />
        </div>
        <div className="col mt-5">
          <UltimosVistos />
        </div>
      </div>
    </div>
  );
};

export default Home;
