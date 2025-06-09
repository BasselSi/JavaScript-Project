// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import prisma from "@/prisma/user";
// import bcrypt from "bcrypt";

// export const authOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email },
//         });
//         if (
//           user &&
//           (await bcrypt.compare(credentials.password, user.password))
//         ) {
//           return user;
//         }
//         return null;
//       },
//     }),
//   ],
//   session: { strategy: "jwt" },
//   pages: {
//     signIn: "/auth/signin",
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
