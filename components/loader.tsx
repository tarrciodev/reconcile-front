import { Loader as LoaderSpin } from "lucide-react";

export function Loader() {
    return (
        <span className='animate animate-spin'>
            <LoaderSpin />
        </span>
    );
}
