export default function HomeLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <main className="bg-black h-screen">
            {children}
        </main>
    )
};