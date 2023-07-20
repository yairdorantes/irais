import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import ReactFileReader from "react-file-reader";
import { Toaster, toast } from "react-hot-toast";
import validator from "validator";
import { uploadFile } from "./firebase/config";
import Loader from "./Loader";
import Registers from "./Registers";
// const url = "https://irais-production.up.railway.app/api";
const url = "http://127.0.0.1:8000/api";
function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }

  return text.slice(0, maxLength) + "...";
}

function App() {
  const [image, setImage] = useState("");
  const [loader, setLoader] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [page, setPage] = useState(1);
  const { register, handleSubmit, reset } = useForm();
  const sendData = async (data) => {
    let isValid = true;
    Object.values(data).forEach((value, key) => {
      const validation = validator.isAlpha(value);
      if (key <= 2) if (!validation) isValid = false;
    });
    if (isValid) {
      setLoader(true);
      const result = await uploadFile(videoFile);
      axios
        .post(`${url}/form`, {
          ...data,
          image: image.base64,
          video: result,
        })
        .then((res) => {
          console.log(res);
          reset();

          toast.success("Enviado con éxito");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Hubó un error en el envio intenta otra vez ");
        })
        .finally(() => {
          setLoader(false);
          setTimeout(() => {
            setPage(0);
          }, 2500);
        });
    } else {
      toast.error("Haz introducido caracteres no alfabéticos");
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
              <div id="image-reader">
                <ReactFileReader
                  handleFiles={(event) => {
                    console.log(event);
                    setImage(event);
                  }}
                  base64={true}
                >
                  <div className="bg-blue-400 text-black rounded-xl p-2">
                    <div>Elige una imagen</div>
                    <svg
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      height="1em"
                      width="1em"
                      className="w-8  mx-auto h-8"
                    >
                      <path d="M16 8A8 8 0 110 8a8 8 0 0116 0zM8.5 4.5a.5.5 0 00-1 0v5.793L5.354 8.146a.5.5 0 10-.708.708l3 3a.5.5 0 00.708 0l3-3a.5.5 0 00-.708-.708L8.5 10.293V4.5z" />
                    </svg>
                    <div>
                      {image.base64 && image.base64.length > 0
                        ? truncateText(image.fileList[0].name, 20)
                        : "-"}
                    </div>
                  </div>
                </ReactFileReader>
              </div>
              <div id="video-reader">
                <div className="bg-blue-400 text-black rounded-xl p-2">
                  <div>Elige una video</div>
                  <svg
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    height="1em"
                    width="1em"
                    className="w-8  mx-auto h-8"
                  >
                    <path d="M16 8A8 8 0 110 8a8 8 0 0116 0zM8.5 4.5a.5.5 0 00-1 0v5.793L5.354 8.146a.5.5 0 10-.708.708l3 3a.5.5 0 00.708 0l3-3a.5.5 0 00-.708-.708L8.5 10.293V4.5z" />
                  </svg>
                  <div>video</div>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setVideoFile(e.target.files[0])}
                  />

                  <div></div>
                </div>
              </div>
              <div className="w-full">
                {loader ? (
                  <Loader />
                ) : (
                  <button
                    // disabled={loader}
                    type="submit"
                    className="btn  w-1/4 btn-success"
                  >
                    Enviar{" "}
                  </button>
                )}
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
