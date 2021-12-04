import { useLoaderData } from "remix";
import { getSession } from "~/utils/sessions.server";

/**
 * This is a brief example on how to use remix with an external API
 * however remix is a fullstack framework that uses React as template system
 * In this particular file we have a loader function which in our server (express)
 */
export const loader = async ({ request }) => {
  const session = await getSession(
    request.headers.get("Cookie")
  );

  const token = session.get("token");

  const response = await fetch(
    "https://rios-task-manager.herokuapp.com/tasks?limit=10&skip=0",
    {
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
    }
  );

  return response.json();
};


/**
 * This is the component that is going to be rendered, I still don't know the mechanics here but
 * it will receive data within the userLoaderData() hook, in this case it happens to be calling
 * an external API, but like I mentioned in the comment above, remix by itself is a fullstack framework
 */
export default function posts() {
  const tasks = useLoaderData();

  return (
    <div>
      <h1>Hellow</h1>
      {tasks.map(task => (
        <div key={task._id}>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
}
