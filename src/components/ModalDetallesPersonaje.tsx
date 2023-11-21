import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { personajeModel } from "../models/personajes.model";
import { useEffect, useState } from "react";
import { ubicacionModel } from "../models/ubicaciones.model";
import axios, { AxiosResponse } from "axios";

const ModalDetallesPersonaje = (props: ModalProps) => {
  const [origin, setOrigin] = useState<ubicacionModel>();
  const [location, setLocation] = useState<ubicacionModel>();

  async function obtenerOrigenYUbicacion() {
    try {
      const respuestaOrigen: AxiosResponse<ubicacionModel> = await axios.get(
        props.personajeSeleccionado?.origin.url!
      );

      const respuestaUbicacion: AxiosResponse<ubicacionModel> = await axios.get(
        props.personajeSeleccionado?.location.url!
      );

      setOrigin(respuestaOrigen.data);
      setLocation(respuestaUbicacion.data);
    } catch (error) {
      console.log("Algo salio mal...");
    }
  }

  useEffect(() => {
    if (props.personajeSeleccionado) {
      obtenerOrigenYUbicacion();
    }
  }, [props.personajeSeleccionado]);

  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle} scrollable>
      <ModalHeader toggle={props.toggle}></ModalHeader>
      <ModalBody>
        <div className="d-flex justify-content-center">
          <Card
            style={{
              width: "50",
            }}
          >
            <img alt="Imagen" src={props.personajeSeleccionado?.image} />
            <CardBody>
              <CardTitle tag="h5">
                {props.personajeSeleccionado?.name}
              </CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                {`${props.personajeSeleccionado?.status} -  ${props.personajeSeleccionado?.species} - ${props.personajeSeleccionado?.type} - ${props.personajeSeleccionado?.gender}`}
              </CardSubtitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                {`Origin: ${origin?.name} -  ${origin?.type} - ${origin?.dimension}`}
              </CardSubtitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                {`Location: ${location?.name} -  ${location?.type} - ${location?.dimension}`}
              </CardSubtitle>
            </CardBody>
          </Card>
        </div>
      </ModalBody>
    </Modal>
  );
};

interface ModalProps {
  isOpen: boolean;
  toggle: () => void;
  personajeSeleccionado: personajeModel | undefined;
}

export default ModalDetallesPersonaje;
