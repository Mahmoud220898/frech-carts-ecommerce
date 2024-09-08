import axios from "axios";
import Loader from "../../components/Loader/Loader";
import ProductItem from "../ProductItem/ProductItem";
import { useQuery } from "react-query";
import { baseUrl } from "../../api/api";
import HashLoader from "react-spinners/HashLoader";

function Products() {
  const { error, isError, isLoading, isFetched, data } = useQuery({
    queryKey: ["getProducts"],
    queryFn: getProducts,
  });
  console.log(data);

  function getProducts() {
    return axios.get(baseUrl + "/api/v1/products");
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
      <div className="pt-12 min-h-screen dark:bg-gray-900 bg-[#fff]">
        <div>
          <div className="max-w-full flex items-center justify-center flex-wrap py-5">
            {data?.data?.data?.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
