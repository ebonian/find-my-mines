import AuthGuard from '../_components/common/auth-guard';
import GameGuard from '../_components/common/game-guard';

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AuthGuard>
            <GameGuard>{children}</GameGuard>
        </AuthGuard>
    );
}
