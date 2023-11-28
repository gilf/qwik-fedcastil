import {component$, Slot} from "@builder.io/qwik";

export default component$(() => {
    return (
        <>
            <div>hello</div>
            <Slot />
        </>
    );
});