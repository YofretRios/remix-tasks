import { getSession } from "~/utils/sessions.server";

export async function getTasks(request) {
  let token = null;

  if (request) {
    const session = await getSession(
      request.headers.get("Cookie")
    );
  
    token = session.get("token");
  } else {
    // const session = await getSession();
    // get token from cookie
  }
  
  const response = await fetch(
    "https://rios-task-manager.herokuapp.com/tasks?limit=10&skip=0",
    {
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
    }
  );

  return response.json();
}