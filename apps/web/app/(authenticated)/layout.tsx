import AuthGuard from '../_components/common/auth-guard';

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <AuthGuard>{children}</AuthGuard>;
}
