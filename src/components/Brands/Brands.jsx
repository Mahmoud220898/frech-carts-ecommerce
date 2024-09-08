import axios from "axios";
import { baseUrl } from "../../api/api";
import { useQuery } from "react-query";
import Loader from "../../components/Loader/Loader";
import { HashLoader } from "react-spinners";

function Brands() {
  const { error, isError, isLoading, isFetched, data } = useQuery({
    queryKey: ["getBrands"],
    queryFn: getBrands,
  });

  function getBrands() {
    return axios.get(baseUrl + "/api/v1/brands");
  }

  if (isLoading) {
    return (
      <div className="w-full flex justify-center h-lvh items-center">
        <HashLoader color="#228B22" size={70} className="spinner" />
      </div>
    );
  }

  return (
    <>
      <div className=" min-h-screen pt-20 px-12 bg-[#fff] dark:bg-gray-900">
        <div className=" text-center ">
          <div className="max-w-full flex items-center justify-center flex-wrap py-5">
            {data?.data.data.map((brand) => (
              <div
                className="w-[23%] dark:bg-gray-700 max-lg:w-[29%] max-md:w-[45%] mt-5 mx-3 max-sm:w-[100%] grid place-items-center product m-2 p-5 rounded border border-[#f0f3f2] shadow-md cursor-pointer "
                key={brand._id}
              >
                <img className="pt-2" src={brand.image} alt="brands" />
                <span className="title dark:text-white pt-3">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Brands;
