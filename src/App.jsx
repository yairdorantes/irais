import { useState } from "react";
import "./App.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import ReactFileReader from "react-file-reader";
import { Toaster, toast } from "react-hot-toast";
// import validator from "validator";
import { uploadFile } from "./firebase/config";
import Loader from "./Loader";
import Registers from "./Registers";
import { api } from "./api";
function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }

  return text.slice(0, maxLength) + "...";
}
function isAlphaWithSpaces(input) {
  const alphaWithSpacesRegex = /^[A-Za-z\s]+$/;
  return alphaWithSpacesRegex.test(input);
}
function App() {
  const [image, setImage] = useState(null);
  const [loader, setLoader] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [page, setPage] = useState(1);
  const { register, handleSubmit, reset } = useForm();
  const sendData = async (data) => {
    let isValid = true;
    Object.values(data).forEach((value, key) => {
      if (key <= 2) {
        const validation = isAlphaWithSpaces(value);
        if (validation === false) isValid = false;
      }
    });
    if (isValid) {
      setLoader(true);
      let imageFireBase = null;
      const imageBase64Size =
        calculateTextSizeInBytes(image.base64) / (1024 * 1024);
      console.log(imageBase64Size);
      if (imageBase64Size > 3)
        imageFireBase = await uploadFile(image.fileList[0]);
      const result = await uploadFile(videoFile);
      if (result) {
        axios
          .post(`${api}/form`, {
            ...data,
            image: imageFireBase ? imageFireBase : image.base64,
            video: result,
          })
          .then((res) => {
            console.log(res);
            reset();
            setVideoFile(null);
            setImage(null);
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
        setLoader(false);
        toast.error("Elige un archivo de menor tamaño");
      }
    } else {
      toast.error("Rellena correctamente todos los campos");
    }
  };

  function calculateTextSizeInBytes(text) {
    const encoder = new TextEncoder();
    const textBytes = encoder.encode(text);
    return textBytes.length;
  }

  return (
    <>
      {page === 1 ? (
        <div className="text-center p-[2rem]">
          <Toaster />
          <div className="text-5xl mb-5 font-extrabold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              Formulario profa Irais
            </span>
          </div>
          <div
            onClick={() => setPage(0)}
            className="text-center badge badge-success mb-5 p-3 italic cursor-pointer hover:badge-secondary"
          >
            Ver registros
          </div>
          <form
            action=""
            className="pb-20"
            onSubmit={handleSubmit((data) => sendData(data))}
          >
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
              <div id="video-reader">
                <ReactFileReader
                  fileTypes={[".webm", ".mp4", ".avi"]}
                  handleFiles={(e) => {
                    console.log(e[0].name);
                    setVideoFile(e[0]);
                  }}
                >
                  <div className="bg-gray-800   rounded-xl p-6">
                    <div>Sube un trailer de la pelicula</div>
                    <svg
                      viewBox="0 0 980 1000"
                      fill="currentColor"
                      height="1em"
                      width="1em"
                      className="w-20 mx-auto h-20"
                    >
                      <path d="M980 250H880v100h100v100H880v100h100v100H880v100h100v60c0 10.667-4 20-12 28s-17.333 12-28 12H40c-10.667 0-20-4-28-12S0 820.667 0 810v-60h100V650H0V550h100V450H0V350h100V250H0v-60c0-12 4-21.667 12-29 8-7.333 17.333-11 28-11h900c10.667 0 20 3.667 28 11s12 17 12 29v60M380 650l250-150-250-150v300" />
                    </svg>
                    <div className="badge badge-warning">
                      {videoFile && videoFile.name.length > 0
                        ? truncateText(videoFile.name, 20)
                        : "-"}
                    </div>

                    <div></div>
                  </div>
                </ReactFileReader>
              </div>
              <input
                type="text"
                {...register("character", { required: true, maxLength: 100 })}
                placeholder="Tu personaje favorito"
                className="input input-bordered input-success w-full max-w-xs"
              />{" "}
              <div id="image-reader">
                <ReactFileReader
                  fileTypes={[".jpg", ".png", ".jpeg", "webp"]}
                  handleFiles={(event) => {
                    console.log(event.fileList[0].size / (1024 * 1024));
                    setImage(event);
                    console.log(event);

                    !event.fileList[0] && alert(event);
                  }}
                  base64={true}
                >
                  <div className="flex flex-col bg-gray-800 rounded-lg p-4 items-center gap-2">
                    <div>Sube una imagen del personaje</div>
                    <div className="">
                      <svg
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        height="1em"
                        width="1em"
                        className="w-20 h-20"
                      >
                        <path d="M6.002 5.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                        <path d="M1.5 2A1.5 1.5 0 000 3.5v9A1.5 1.5 0 001.5 14h13a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0014.5 2h-13zm13 1a.5.5 0 01.5.5v6l-3.775-1.947a.5.5 0 00-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 00-.63.062L1.002 12v.54A.505.505 0 011 12.5v-9a.5.5 0 01.5-.5h13z" />
                      </svg>
                    </div>
                    <div className="badge badge-warning">
                      {image &&
                      image.fileList[0] &&
                      image.fileList[0].name.length > 0
                        ? truncateText(image.fileList[0].name, 20)
                        : "-"}
                    </div>
                  </div>
                </ReactFileReader>
              </div>
              <input
                type="url"
                {...register("song_link", { required: true, maxLength: 2048 })}
                placeholder="Link a cancion"
                className="input input-bordered input-success w-full max-w-xs"
              />
              <div className="w-full">
                {loader ? (
                  <Loader />
                ) : (
                  <button
                    disabled={!videoFile || !image}
                    type="submit"
                    className="btn  w-48 btn-success"
                  >
                    Enviar
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
