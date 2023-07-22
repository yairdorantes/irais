import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { api } from "./api";
import OutsideClickHandler from "react-outside-click-handler";
import Loader from "./Loader";

function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

const Registers = ({ changeState }) => {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const [info, setInfo] = useState({});
  const [data, setdata] = useState([]);
  const getData = () => {
    setIsLoading(true);
    axios
      .get(`${api}/form`)
      .then((res) => {
        console.log(res);
        setdata(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <dialog id="my_modal_2" className="modal">
        <form method="dialog" className="modal-box ">
          <OutsideClickHandler onOutsideClick={pauseVideo}>
            <div className="absolute cursor-pointer top-0 right-4 modal-action">
              <button onClick={pauseVideo}>
                <svg fill="none" viewBox="0 0 15 15" height="2em" width="2em">
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M11.782 4.032a.575.575 0 10-.813-.814L7.5 6.687 4.032 3.218a.575.575 0 00-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 00.814.814L7.5 8.313l3.469 3.469a.575.575 0 00.813-.814L8.313 7.5l3.469-3.468z"
                    clipRule="evenodd"
                    className=" text-red-500"
                  />
                </svg>
              </button>
            </div>
            <p className="py-4 text-center font-bold text-xl text-white">
              {info.movie}
            </p>
            {info.video && info.video.length > 0 && (
              <video
                ref={videoRef}
                className="mx-auto rounded-md"
                src={info.video}
                controls
              />
            )}
            <p className="text-center mb-3 font-bold text-white text-xl mt-5">
              {info.character}
            </p>
            {info.image && info.image.length > 0 && (
              <div className="max-w-lg">
                <img src={info.image} />
              </div>
            )}
          </OutsideClickHandler>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

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
        {data.length > 0 && (
          <div className="overflow-x-auto mt-5">
            <table className="table table-zebra text-center">
              {/* head */}
              <thead>
                <tr className="text-white text-md">
                  {/* <th></th> */}
                  <th className=" ">Nombre</th>
                  {/* <th>Personaje favorito</th> */}
                  <th>Canción</th>
                  <th>Video/Imagen</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}

                {data.map((dato, i) => (
                  <tr key={i}>
                    {/* <th>{i + 1}</th> */}
                    <td>{dato.name}</td>
                    {/* <td>{dato.movie}</td> */}
                    {/* <td>{dato.character}</td> */}
                    <td className="link link-info ">
                      <a href={dato.song_link} rel="noreferrer" target="_blank">
                        {truncateText(dato.song_link, 25)}
                      </a>
                    </td>
                    <th
                      onClick={() => {
                        setInfo(dato);
                        window.my_modal_2.showModal();
                      }}
                      className="badge badge-info mt-2 cursor-pointer hover:badge-secondary"
                    >
                      Mostrar
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {data.length === 0 && !isLoading && (
          <div className="alert max-w-lg mx-auto  mt-3 alert-info">
            Nada por aqui....
          </div>
        )}
        {isLoading && (
          <div>
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default Registers;
