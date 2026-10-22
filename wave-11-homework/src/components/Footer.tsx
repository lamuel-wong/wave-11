export const Footer = ({companyName}: {companyName: string}) => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 text-sm text-gray-600">
            <p>© {currentYear} {companyName}</p>
            <p>Prices in USD</p>
        </footer>
    );
};