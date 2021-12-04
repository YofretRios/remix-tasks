import {
  createCookieSessionStorage,
  redirect
} from "remix";

export const { getSession, commitSession } = createCookieSessionStorage({
  cookie: {
    name: "RJ_session",
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true
  }
});

export async function login({ email, password }) {
  const response = await fetch(
    "https://rios-task-manager.herokuapp.com/users/login",
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      },
    }
  );

  const user = await response.json();

  if (!user.token) {
    return null;
  }

  return user;
}

export async function createUserSession(token, redirectTo) {
  const session = await getSession();
  session.set("token", token);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

