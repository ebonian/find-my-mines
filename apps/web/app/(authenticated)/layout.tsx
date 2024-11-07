import AuthGuard from '../_components/common/auth-guard';
import GameContextProvider from '../_contexts/game';
import SocketContextProvider from '../_contexts/socket';

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SocketContextProvider>
            <GameContextProvider>
                <AuthGuard>{children}</AuthGuard>
            </GameContextProvider>
        </SocketContextProvider>
    );
}
