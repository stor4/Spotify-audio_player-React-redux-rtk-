import React from 'react'
import { createApi } from '@reduxjs/toolkit/query/react'
import store from "../rootReducer/rootReducer";
import backendURL from "../../data/backEndURL";
import {graphqlRequestBaseQuery} from "@rtk-query/graphql-request-base-query";

const api = createApi({
    baseQuery: graphqlRequestBaseQuery({
        url: backendURL + 'graphql',
        prepareHeaders: (headers) => {
            if(store.getState().auth.token) {
                headers.set('authorization', `Bearer ${store.getState().auth.token}`)
            }
            // console.log(headers)
            return headers
        }
    }),
    endpoints: (builder) => ({
        login:builder.mutation({
            query: ({login, password}) => ({
                document:
                    `query login($login: String!, $password: String!) {
          login(login: $login, password: $password) 
      }
      `,
                variables: {login, password}
            })
        }),
        userInfo:builder.query({
            query: ({_id}) => ({
                document: `query UserFindOne($_id: String!) {
          UserFindOne(query: $_id){
            nick login avatar{url}
          }
        }`,
                variables: {_id: JSON.stringify([_id])}
            })
        }),
        createUser:builder.mutation({
            query: ({login, password}) => ({
                document: `mutation createUser($login:String!, $password:String!){
          createUser(login: $login, password: $password){
            _id 
          }
        }
        `,
                variables: {login, password}
            })
        }),
        playlistFind:builder.mutation({
            query: (playlistFind) => ({
                document: `query playlistFind($playlistFind:String!){
          PlaylistFind (query: $playlistFind){
            _id name owner{nick} tracks{url _id originalFileName} description
          }
        }
        `,
                variables: {playlistFind: JSON.stringify([playlistFind])}
            })
        }),
        playlistFind2:builder.query({
            query: (playlistFind) => ({
                document: `query playlistFind($playlistFind:String!){
          PlaylistFind (query: $playlistFind){
            _id name owner{nick} tracks{url _id originalFileName} description
          }
        }
        `,
                variables: {playlistFind: JSON.stringify([playlistFind])}
            })
        }),
        playlistUpsert:builder.mutation({
            query: (playlist) => ({
                document: `mutation PlaylistUpsert($playlist:PlaylistInput){
          PlaylistUpsert(playlist: $playlist){
            _id
          }
        }
        `,
                variables: {playlist: playlist}
            })
        }),
        trackFind:builder.mutation({
            query: (trackFind) => ({
                document: `query trackFind($trackFind:String!){
          TrackFind (query: $trackFind){
            _id originalFileName owner{nick} id3{title artist album year} url
          }
        }
        `,
                variables: {trackFind: JSON.stringify([trackFind])}
            })
        }),
        trackFind2:builder.query({
            query: (trackFind) => ({
                document: `query trackFind($trackFind:String!){
          TrackFind (query: $trackFind){
            _id originalFileName owner{nick} id3{title artist album year} url
          }
        }
        `,
                variables: {trackFind: JSON.stringify([trackFind])}
            })
        }),
        trackFindOne:builder.mutation({
            query: (originalFileName) => ({
                document: `query trackFindOne($trackFindOne:String!){
          TrackFindOne(query: $trackFindOne){
            _id originalFileName 
          }
        }
        `,
                variables: {trackFindOne: JSON.stringify([originalFileName])}
            })
        }),
        trackCount:builder.query({
            query: ({trackCount}) => ({
                document: `query trackCount($trackCount:Int){
          TrackCount(query: $trackCount){
            _id originalFileName
          }
        }
        `,
                variables: {trackCount}
            })
        }),
        trackDelete:builder.mutation({
            query: ({trackDelete}) => ({
                document: `mutation trackDelete($trackDelete:String!){
          TrackDelete(track: $trackDelete){
            _id
          }
        }
        `,
                variables: {trackDelete}
            })
        }),
        setAvatar:builder.mutation({
            query: ({user}) => ({
                document: `mutation SetAvatar($user:UserInput){
          UserUpsert(user: $user){
            _id avatar{_id}
          }
        }
        `,
                variables: {user}
            })
        })

    })

})
// console.log(api)
// const { useLoginMutation, useCreateUserMutation, useTrackFindMutation, useTrackFind2Query, useTrackFindOneMutation, usePlaylistFindMutation, usePlaylistFind2Query, usePlaylistUpsertMutation, useUserInfoQuery, useSetAvatarMutation } = api

export default api
