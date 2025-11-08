import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from 'axios';
import jwt from 'jsonwebtoken'
axios.defaults.baseURL = process.env.NEXT_PUBLIC_ENDPOINT

export const authOptions = {
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        }),
        CredentialsProvider({
            async authorize(credentials, req) {
                try {
                    const {username, password} = credentials
                    const {data} = await axios.post('/auth/login/',{username, password})
                    const verified = jwt.verify(data.access,process.env.NEXTAUTH_SECRET)
                    return {
                        name: verified.fullname,
                        email: verified.email,
                        mobile: verified.mobile,
                        id: verified.user_id,
                        image: verified.image,
                        country: verified.country,
                        gender: verified.gender,
                        ...data
                    }
                }
                catch(err)
                {
                    return null
                }
            }
        })
    ],
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt({token, user}) {
            return {
                ...token,
                ...user
            }
        },
        async session({session, token}) {
            session.user = token
            return session
        }
    }
}

export default NextAuth(authOptions)