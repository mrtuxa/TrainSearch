import uwufy from 'uwufy';
export default function Header() {
    return (
        <h1 className="text-3xl font-bold underline">
            {uwufy("Hello World")}
        </h1>
    )
}