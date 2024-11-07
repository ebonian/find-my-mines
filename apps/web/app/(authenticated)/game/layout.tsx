import GameGuard from '../../_components/common/game-guard';

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <GameGuard>{children}</GameGuard>;
}
