import {component$, useSignal} from "@builder.io/qwik";
import {Form, routeAction$, routeLoader$, server$} from "@builder.io/qwik-city";

type User = {
    name: string;
    color: string;
}

type HelloProps = {
    user: User;
}

const users = [{ name: "Gil", color: "green" },
    { name: "Adir", color: "blue" }];

export const useUsersList = routeLoader$(() => {
   return users;
});

export const useAddUser = routeAction$((data ) => {
    const user = data as User;
    users.push(user);
});

export const Hello = component$(({ user }: HelloProps) => {
    return (
        <li style={{ backgroundColor: user.color }}>hello, {user.name}</li>
    )
});

export default component$(() => {
    const usersList = useUsersList();
    const action = useAddUser();
    const myState = useSignal<boolean>(false);
    const serverClick = server$(async () => {
        console.log('in the server');
    });
    return (
        <>
            <Form action={action}>
                <label for="name">Name:</label><input name="name" />
                <label for="color">Color:</label><input name="color" />
                <button>Add User</button>
            </Form>
            {myState.value && <button onClick$={serverClick}>Log in server</button>}
            <button onClick$={() => myState.value = !myState.value}>Toggle</button>
            <ul>
                {
                    usersList.value.map((user) => {
                        return (<Hello user={user} key={user.name} />);
                    })
                }
            </ul>
        </>
    );
});