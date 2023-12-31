import { ListGroup, ListGroupItem } from "reactstrap";
import { listaPersonajesModel } from "../models/personajes.model";
import "../styles/generalStyles.css";
import React, { useEffect, useState } from "react";

const ListadoPersonajes = (props: listadoPersonajesProps) => {
  const [numeroPaginasMostrando, setNumeroPaginasMostrando] = useState<
    number[]
  >([]);

  const listGroupStyle: React.CSSProperties = {
    overflowY: "auto",
    maxHeight: "60vh",
  };

  const listItemStyle: React.CSSProperties = {
    float: "left",
    cursor: "pointer",
  };

  useEffect(() => {
    if (numeroPaginasMostrando.length == 0) {
      if (props.listaPersonajes?.results.length! >= 5) {
        setNumeroPaginasMostrando(obtenerPaginasTotal().slice(0, 5));
      } else {
        setNumeroPaginasMostrando(
          obtenerPaginasTotal().slice(0, props.listaPersonajes?.results.length)
        );
      }
    } else {
    }
  }, [props.listaPersonajes]);

  function obtenerPaginasTotal(): number[] {
    const numeroDePaginas = Array.from(
      { length: props.listaPersonajes?.info.pages! },
      (_, i) => i + 1
    );

    return numeroDePaginas;
  }

  function isCurrentPage(pagina: number): boolean {
    try {
      const urlSiguientePagina: string = props.listaPersonajes?.info.next!;
      const urlAnteriorPagina: string = props.listaPersonajes?.info.prev!;

      if (urlSiguientePagina) {
        const numeroSiguientePagina: number = Number(
          urlSiguientePagina.match(/page=(\d+)/)![1]
        );

        const numeroPaginaActual: number = numeroSiguientePagina - 1;
        return numeroPaginaActual == pagina;
      } else {
        const numeroAnteriorPagina: number = Number(
          urlAnteriorPagina.match(/page=(\d+)/)![1]
        );

        const numeroPaginaActual: number = numeroAnteriorPagina + 1;
        return numeroPaginaActual == pagina;
      }
    } catch (error) {
      return false;
    }
  }

  function onClickSiguiente() {
    if (
      // Esta validación evita que se ejecute el comportamiento cuando ya no quedan mas paginas por mostrar
      obtenerPaginasTotal()[numeroPaginasMostrando[0] + 4] == undefined &&
      obtenerPaginasTotal()[numeroPaginasMostrando[0] + 9] == undefined
    ) {
      return;
    }

    const numerosPorMostrar: number[] = obtenerPaginasTotal().slice(
      numeroPaginasMostrando[0] + 4,
      numeroPaginasMostrando[0] + 9
    );

    setNumeroPaginasMostrando(numerosPorMostrar);
  }

  function onClickAnterior() {
    if (
      // Esta validación evita que se ejecute el comportamiento cuando ya no quedan mas paginas por mostrar
      obtenerPaginasTotal()[numeroPaginasMostrando[0] - 6] == undefined ||
      obtenerPaginasTotal()[numeroPaginasMostrando[0] - 1] == undefined
    ) {
      return;
    }

    const numerosPorMostrar: number[] = obtenerPaginasTotal().slice(
      numeroPaginasMostrando[0] - 6,
      numeroPaginasMostrando[0] - 1
    );

    setNumeroPaginasMostrando(numerosPorMostrar);
  }

  return (
    <>
      {props.listaPersonajes ? (
        <>
          {/* LIST ITEMS DE LOS PERSONAJES */}
          <ListGroup style={listGroupStyle}>
            {props.listaPersonajes.results.map((x) => (
              <ListGroupItem
                style={{ cursor: "pointer" }}
                action
                key={x.id}
                onClick={() => props.onClickPersonaje(x.id) }
              >
                <div className="fw-bold">{x.name}</div>
                {x.location.name}
              </ListGroupItem>
            ))}
          </ListGroup>
          {/* NUMEROS DE PAGINAS */}
          <ul
            style={{
              listStyleType: "none",
            }}
          >
            <li
              className="p-3"
              key={"x"}
              style={listItemStyle}
              onClick={() => onClickAnterior()}
            >
              {"<<"}
            </li>
            {numeroPaginasMostrando.map((numero) => (
              <li
                className="p-3"
                key={numero}
                style={listItemStyle}
                onClick={() => props.onClickPage(numero)}
              >
                {isCurrentPage(numero) ? `-${numero}-` : numero}
              </li>
            ))}
            <li
              className="p-3"
              key={"y"}
              style={listItemStyle}
              onClick={() => onClickSiguiente()}
            >
              {">>"}
            </li>
          </ul>
        </>
      ) : (
        <span>Cargando personajes...</span>
      )}
    </>
  );
};

interface listadoPersonajesProps {
  listaPersonajes?: listaPersonajesModel;
  onClickPage: (pagina: number) => void;
  onClickPersonaje: (id: number) => void;
}

export default ListadoPersonajes;
