import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";
import { IActor } from "@/GlobalTypes/Actor";
 

const actorsApi=createApi({
    reducerPath:"actors/api",
    baseQuery,
    endpoints:(builder)=>({
        getActor:builder.query<IActor,string>({
            query:(id)=>({
                url:`v1/staff/${id}`,
             }),
             transformResponse:(res:IActor):IActor=>{

                 

                 
                const getUniqueFilms=res.films.reduce((aggr,val )=>{
                    val.posterUrlPreview=`https://kinopoiskapiunofficial.tech/images/posters/kp/${val.filmId}.jpg`
                        const key=  val.rating? +val.rating : val.filmId
                    aggr[key]=val
                    return aggr

                },{} as Record<number,IActor['films'][0]>)

                res.films=Object.values(getUniqueFilms).reverse()
                

                return  res
             }
        }),

    })
})
export const{ useGetActorQuery}= actorsApi
export default actorsApi