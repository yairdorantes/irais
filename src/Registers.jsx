import axios from "axios";
import { useEffect, useState } from "react";
import { api } from "./api";

function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }

  return text.slice(0, maxLength) + "...";
}

const Registers = ({ changeState }) => {
  const [data, setdata] = useState([]);
  const getData = () => {
    axios
      .get(`${api}/form`)
      .then((res) => {
        console.log(res);
        setdata(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div>
        <button
          className="btn btn-info rounded-full"
          onClick={() => changeState(1)}
        >
          <svg
            viewBox="0 0 512 512"
            fill="currentColor"
            height="1em"
            className="w-7 h-7"
            width="1em"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={32}
              d="M112 160l-64 64 64 64"
            />
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={32}
              d="M64 224h294c58.76 0 106 49.33 106 108v20"
            />
          </svg>
        </button>
      </div>
      <div>
        {data.length > 0 ? (
          <div className="overflow-x-auto mt-5">
            <table className="table table-zebra text-center">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Nombre</th>
                  <th>Pelicula favorita</th>
                  <th>Personaje favorito</th>
                  <th>Canción</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}

                {data.map((dato, i) => (
                  <tr key={i}>
                    <th>{i + 1}</th>
                    <td>{dato.name}</td>
                    <td>{dato.movie}</td>
                    <td>{dato.character}</td>
                    <td className="link link-info ">
                      <a href={dato.song_link} rel="noreferrer" target="_blank">
                        {truncateText(dato.song_link, 25)}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="alert max-w-lg mx-auto  mt-3 alert-info">
            Nada por aqui....
          </div>
        )}
      </div>
    </div>
  );
};

export default Registers;
