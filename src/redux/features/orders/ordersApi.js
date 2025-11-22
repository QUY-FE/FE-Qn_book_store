import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



const ordersApi = createApi({
    reducerPath: "ordersApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_KEY}/orders`,
        credentials: "include",
    }),
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (newOrder) => ({
                url: '/',
                method: "POST",
                body: newOrder,
            }),
            invalidatesTags: ['Orders'],
        }),
        getOrderByEmail: builder.query({
            query: (email) => ({
                url: `/email/${email}`,
            }),
            providesTags: ["Orders"]
        })

    })

})

export const { useCreateOrderMutation , useGetOrderByEmailQuery} = ordersApi;
export default ordersApi;