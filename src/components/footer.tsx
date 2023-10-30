import logo from "../assets/logo4.png"

export function Footer() {
    return (
        <footer className="bg-blue-800 text-white">
            <div className="container mx-auto py-6 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
                    <div className="flex justify-center">
                        <img width={100} src={logo} alt="" />
                    </div>
                    <div className="text-center md:text-left">
                        <ul className="space-y-2">
                            <li>
                                <a href="/termos-de-uso" className="hover:text-blue-500">Termos de Uso</a>
                            </li>
                            <li>
                                <a href="/privacidade" className="hover:text-blue-500">Privacidade</a>
                            </li>
                            <li>
                                <a href="/contato" className="hover:text-blue-500">Contato</a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
            <div className="bg-white text-gray-700 py-2">
                <div className="container mx-auto text-center">
                    <p>&copy; 2023 Brasil Consultas. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
