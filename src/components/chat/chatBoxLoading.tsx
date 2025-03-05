

export default function ChatBoxLoading() {
    return (
        <div className="flex min-h-screen min-w-full items-center justify-center absolute bg-opacity-25	bg-gray-300 animate-pulse">
        <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-red-600" />
        </div>
    )
}