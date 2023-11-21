import { ListGroup, ListGroupItem } from "reactstrap";
import { personajeModel } from "../models/personajes.model";

const UltimosVistos = (props: ultimosVistosProps) => {
  const listGroupStyle: React.CSSProperties = {
    overflowY: "auto",
    maxHeight: "60vh",
  };

  return (
    <>
      {props.listaPersonajes ? (
        <>
          <ListGroup style={listGroupStyle}>
            {props.listaPersonajes.map((x) => (
              <ListGroupItem
                style={{ cursor: "pointer" }}
                action
                key={x.id}
                onClick={() => props.onClickPersonaje(x.id)}
              >
                <div className="fw-bold">
                  {x.name}
                </div>
                {x.location.name}
              </ListGroupItem>
            ))}
          </ListGroup>
        </>
      ) : (
        <span>...</span>
      )}
    </>
  );
};

interface ultimosVistosProps {
  listaPersonajes?: personajeModel[];
  onClickPersonaje: (id: number) => void;
}

export default UltimosVistos;
