import React, { useEffect } from 'react';
import ProductItem from "./product/ProductItem.jsx"
import { useGetProductsQuery } from "../../redux/api/productsApi.js";
import Custompagination from './customPagination.jsx';
import toast from "react-hot-toast"
import Loader from "../layouts/loader.jsx"
import { useSearchParams } from 'react-router-dom';
import Filters from "./Filters.jsx"

const Home = () => {

  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || "";
  const min = searchParams.get("min")
  const max = searchParams.get("max")
  const category = searchParams.get("category")
  const ratings = searchParams.get("ratings")

  const params = {page, keyword};

  min !== null && (params.min = min)
  max !== null && (params.max = max)
  category !== null && (params.category = category)
  ratings !== null && (params.ratings = ratings)

  const {data, isLoading, error, isError} = useGetProductsQuery(params)


  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message)
    }
  }, [isError])

  if (isLoading) return <Loader />

  const columnSize = keyword ? 4 : 3
  
    return (

  <>

  <div className='row'>
    {keyword && (
      <div className='col-6 col-md-3 mt-5'>
        <p><Filters /></p>
      </div>
    )}
        <div className={keyword ? "col-12 col-md-9"  : "text-center"} >
          <h1 id="products_heading" className="text-secondary" >{keyword ? `${data?.products?.length} Products found with keyword: ${keyword}` : "Latest Products" }</h1>
          
         
          <div >
          <section id="products" >
           <div className='row'>
            {data?.products.map((products) => (
            <ProductItem product={products} columnSize={columnSize} />
           ))}
           </div>
           
          </section>
          </div>
          <Custompagination resPerPage={data?.resPerPage} filteredProductsCount={data?.filteredProductsCount}/>
          </div>
          </div>
    
</>
    )
}

export default Home