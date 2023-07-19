import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
const url = "http://127.0.0.1:8000/api";

function Registers({ changeState }) {
  const [data, setdata] = useState([]);
  const getData = () => {
    axios
      .get(`${url}/form`)
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
  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }

    return text.slice(0, maxLength) + "...";
  }
  return (
    <div>
      <div>
        <button className="btn btn-info" onClick={() => changeState(1)}>
          Regresar
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
}

function App() {
  const [page, setPage] = useState(1);
  const [disableButton, setDisableButton] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const sendData = (data) => {
    const cont = JSON.parse(localStorage.getItem("info"));
    if (cont) {
      if (cont < 7) {
        const newCont = cont + 1;
        localStorage.setItem("info", JSON.stringify(newCont));
        setDisableButton(true);
        axios
          .post(`${url}/form`, data)
          .then((res) => {
            console.log(res);
            toast.success("Enviado con éxito");
          })
          .catch((err) => {
            console.log(err);
            toast.error("Hubó un error en el envio intenta otra vez ");
          })
          .finally(() => {
            setTimeout(() => {
              setDisableButton(false);
            }, 2500);
            setPage(0);
          });
      } else {
        toast.error("Haz excedido el numero de envios permitidos");
      }
    } else {
      localStorage.setItem("info", JSON.stringify(1));
    }
  };
  return (
    <>
      {page === 1 ? (
        <div>
          <Toaster />
          <div className="text-5xl mb-5 font-extrabold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              Formulario profa Irais
            </span>
          </div>
          <div
            onClick={() => setPage(0)}
            className="badge badge-success mb-5 p-3 italic cursor-pointer hover:badge-secondary"
          >
            Ver registros
          </div>
          <form action="" onSubmit={handleSubmit((data) => sendData(data))}>
            <div className="flex gap-3 flex-col justify-center items-center ">
              <input
                type="text"
                placeholder="Tu nombre"
                {...register("name", { required: true, maxLength: 100 })}
                className="input input-bordered input-success w-full max-w-xs"
              />
              <input
                type="text"
                {...register("movie", { required: true, maxLength: 100 })}
                placeholder="Tu película favorita"
                className="input input-bordered input-success w-full max-w-xs"
              />{" "}
              <input
                type="text"
                {...register("character", { required: true, maxLength: 100 })}
                placeholder="Tu personaje favorito"
                className="input input-bordered input-success w-full max-w-xs"
              />{" "}
              <input
                type="url"
                {...register("song_link", { required: true, maxLength: 2048 })}
                placeholder="Link a cancion"
                className="input input-bordered input-success w-full max-w-xs"
              />
              <div className="w-full">
                <button
                  disabled={disableButton}
                  type="submit"
                  className="btn  w-1/4 btn-success"
                >
                  Enviar{" "}
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <Registers changeState={setPage} />
      )}
    </>
  );
}

export default App;
