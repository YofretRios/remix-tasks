import { login, createUserSession } from "~/utils/sessions.server";

export const action = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");
  const user = await login({ email, password });

  return createUserSession(user.token, "/posts");
};

export default function Login() {
  return (
    <div>
      <h1>Login</h1>
      <form method="post" action="/login">
        <input
          name="email"
          type="text"
          defaultValue="riosmerca28@gmail.com"
        />
        <input name="password" type="password" defaultValue="232412Zero" />
        <button type="submit">Login!</button>
      </form>
    </div>
  );
}
