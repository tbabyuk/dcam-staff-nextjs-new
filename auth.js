import { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"


const credentialsConfig = CredentialsProvider({

    name: "Credentials",
    credentials: {
        email: {
            label: "Email",
            type: "email"
        },
        password: {
            label: "Password",
            type: "password"
        }
    },
    async authorize(credentials) {
        if(credentials.email === "taisiya.sarkisova@mail.ru" && credentials.password === "voice7975")
            return {
                name: "taisiya",
        };
        if(credentials.email === "raulitoapcu@yahoo.com" && credentials.password === "drums9613")
            return {
                name: "raul",
        };
        else return null;
    }
})

const config = {
    providers: [Google, credentialsConfig]
}

export const {handlers, auth, signIn, signOut} = NextAuth(config)