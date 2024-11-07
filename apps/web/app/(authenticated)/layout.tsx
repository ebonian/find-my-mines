import AuthGuard from '../_components/common/auth-guard';
import GameGuard from '../_components/common/game-guard';
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
                <AuthGuard>
                    <GameGuard>{children}</GameGuard>
                </AuthGuard>
            </GameContextProvider>
        </SocketContextProvider>
    );
}
