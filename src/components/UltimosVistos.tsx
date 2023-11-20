import { ListGroup, ListGroupItem } from "reactstrap";
import { listaPersonajesModel } from "../models/personajes.model";

const UltimosVistos = () => {
  return (
    <>
      <ListGroup>
        <ListGroupItem style={{ cursor: "pointer" }} action href="#">
          <div className="fw-bold">Nombre</div>
          Origen
        </ListGroupItem>
      </ListGroup>
    </>
  );
};

export default UltimosVistos;
