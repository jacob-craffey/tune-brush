import NextAuth, { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    {
      id: "genius",
      name: "Genius",
      type: "oauth",
      authorization: {
        url: "https://api.genius.com/oauth/authorize",
        params: { scope: "me" },
      },
      token: "https://api.genius.com/oauth/token",
      userinfo: "https://api.genius.com/account",
      profile(profile, token) {
        return {
          token: token.access_token,
          id: profile.response.user.id,
          name: profile.response.user.name,
          email: profile.response.user.email,
          image: profile.response.user.photo_url,
        };
      },
      clientId: process.env.GENIUS_CLIENT_ID,
      clientSecret: process.env.GENIUS_CLIENT_SECRET,
    },
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
