import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { local, publicSite } from "../routers/constanst";
import TableCards from "../component/tableCards";
import Swal from "sweetalert2";

function Admin() {
  const navigate = useNavigate();
  const [card, setCard] = useState();
  useEffect(() => {
    dataCard();
  }, []);

  const dataCard = async (e) => {
    try {
      const { data } = await axios.get(publicSite + "market", {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      });
      // console.log(data);
      setCard(data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: error.response.data.message,
      });
    }
  };

  const deleteCards = async (id) => {
    try {
      //   console.log("masuk >", id);
      await axios.delete(publicSite + `delete/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.token,
        },
      });

      Swal.fire({
        icon: "success",
        title: "succes deleted card",
      });
      dataCard();
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: error.response.data.message,
      });
    }
  };

  const back = () => {
    // console.log("masuk");
    navigate("/mainpages/user");
  };
  return (
    <>
      <section className="w-full h-fit pt-12">
        <button onClick={back} className="px-10 py-2 rounded-md ms-10 my-10 bg-red-400 text-white">
          Back
        </button>
        <div class="hidden md:block relative overflow-x-auto mx-3">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3">
                  id
                </th>
                <th scope="col" class="px-6 py-3">
                  name
                </th>
                <th scope="col" class="px-6 py-3">
                  type
                </th>
                <th scope="col" class="px-6 py-3">
                  rarity
                </th>
                <th scope="col" class="px-6 py-3">
                  elixir
                </th>
                <th scope="col" class="px-6 py-3">
                  cardPrice
                </th>
                <th scope="col" class="px-6 py-3">
                  description
                </th>
                <th scope="col" class="px-6 py-3">
                  imgUrl
                </th>
                <th scope="col" class="px-6 py-3">
                  actions
                </th>
              </tr>
            </thead>
            <tbody>
              {card &&
                card.map((el) => {
                  return <TableCards key={el.id} data={el} deleteId={deleteCards} />;
                })}
            </tbody>
          </table>
        </div>

        <h1 className="text-center text-[25px]">Please use a larger device</h1>
        <h1 className="text-center text-[25px]">To go inside Admin mode</h1>
      </section>
    </>
  );
}

export default Admin;
