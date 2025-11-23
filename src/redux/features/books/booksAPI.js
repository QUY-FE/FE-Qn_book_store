import { createApi, fetchBaseQuery  } from '@reduxjs/toolkit/query/react';

const API = import.meta.env.VITE_API_KEY

const baseQuery = fetchBaseQuery({
    baseUrl: `${API}/books`,
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token = localStorage.getItem('token');
        if(token) {
            Headers.set('Authorization', `Bearer ${token}`)
        }
        return Headers;
    }
    
})

const booksApi = createApi({
    reducerPath: 'BookApi',
    baseQuery,
    tagTypes: ["Books"],
    endpoints: (builder) => ({
        fetchAllBooks: builder.query({
            query: () => "/",
            providesTags: ["Books"]
        }),
        fetchBooksById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, err, id) => [{type: "Books", id}],
        }),
        addBook: builder.mutation({
            query: (newBook) => ({
                url: '/create-book',
                method: "POST",
                body: newBook,
            }),
            invalidatesTags: ["Books"],
        }),
        updateBook: builder.mutation({
            query: ({id, ...rest }) => ({
                url: `/edit/${id}`,
                method: "PUT",
                body: rest,
                headers: {
                    "Content-Type": "application/json"
                }
            }),
            invalidatesTags: ["Books"],
        }),
        deletedBook: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Books"],
        })
    })
})

export const {useFetchAllBooksQuery , useFetchBooksByIdQuery , useAddBookMutation, useUpdateBookMutation, useDeletedBookMutation } = booksApi;
export default booksApi;