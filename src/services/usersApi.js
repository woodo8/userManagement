// src/services/taskApi.js
import {
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
    reducerPath: "tasksApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/"
        // baseUrl: "https://webauth.herokuapp.com/"
    }),
    tagTypes: [ 'Users'],
    endpoints: (builder) => ({
        users: builder.query({
            query: () => ({
                url: "/users",
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("access")}`
                },
                providesTags: ['Users'],
            })
        }),
        signin: builder.mutation({
            query: (data) => ({
                url: "/users/signin",
                method: "POST",
                body: data
            })
        }),
        signup: builder.mutation({
            query: (data) => ({
                url: "/users/signup ",
                method: "POST",
                body: data
            })
        }),
        updateStatus: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/users/changeStatus/${id}`,
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("access")}`
                },
                body: rest,
                invalidatesTags: ['Users'],
            })
        }),

    }),
    // addTask: builder.mutation({
    //     query: (task) => ({
    //         url: "/tasks",
    //         method: "POST",
    //         body: task
    //     })
    // }),
    // deleteTask: builder.mutation({
    //     query: (id) => ({
    //         url: `/tasks/${id}`,
    //         method: "DELETE"
    //     })
    // })
})
export const {
    useUsersQuery,
    useSigninMutation,
    useSignupMutation,
    useUpdateStatusMutation,
    // useAddTaskMutation,
    // useUpdateTaskMutation,
    // useDeleteTaskMutation
} = usersApi;