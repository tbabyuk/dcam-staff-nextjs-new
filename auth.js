import { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
// import Google from "next-auth/providers/google"
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
        if(credentials.email === process.env.AARON_EMAIL && credentials.password === process.env.AARON_PASS)
            return {
                name: "Aaron",
        };
        if(credentials.email === process.env.CHLOE_EMAIL && credentials.password === process.env.CHLOE_PASS)
            return {
                name: "Chloe",
        };
        if(credentials.email === process.env.GIANCARLO_EMAIL && credentials.password === process.env.GIANCARLO_PASS)
            return {
                name: "Giancarlo",
        };
        if(credentials.email === process.env.LINDA_EMAIL && credentials.password === process.env.LINDA_PASS)
            return {
                name: "Linda",
        };
        if(credentials.email === process.env.RAUL_EMAIL && credentials.password === process.env.RAUL_PASS)
            return {
                name: "Raul",
        };
        if(credentials.email === process.env.SENYA_EMAIL && credentials.password === process.env.SENYA_PASS)
            return {
                name: "Senya",
        };
        if(credentials.email === process.env.TAISIYA_EMAIL && credentials.password === process.env.TAISIYA_PASS)
            return {
                name: "Taisiya",
        };
        if(credentials.email === process.env.TIAGO_EMAIL && credentials.password === process.env.TIAGO_PASS)
            return {
                name: "Tiago",
        };
        else return null;
    }
})

const config = {
    providers: [credentialsConfig]
}

// export const {handlers, auth, signIn, signOut} = NextAuth(config)
export const {handlers, auth} = NextAuth(config)