import { useLoaderData } from "remix";
import { getTasks } from "~/modules/tasks";

/**
 * This is a brief example on how to use remix with an external API
 * however remix is a fullstack framework that uses React as template system
 * In this particular file we have a loader function which in our server (express)
 */
export const loader = async ({ request }) => {
  return getTasks(request);
};

/**
 * This is the component that is going to be rendered, I still don't know the mechanics here but
 * it will receive data within the userLoaderData() hook, in this case it happens to be calling
 * an external API, but like I mentioned in the comment above, remix by itself is a fullstack framework
 */
export default function posts(props) {
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
