import { useEffect, useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { ConsultStepBox } from "../components/consult-step-box";
import { FaLock, FaSearch, FaUserAlt } from "react-icons/fa";
import { Helmet } from "react-helmet"
import logo from "../assets/logo.png"
import logo2 from "../assets/logo3.png"
import { api } from "../config/axios";

interface IUser {

    numero_de_cpf: string;
    nome_da_pf: string;
    data_nascimento: string;
    situacao_cadastral: string;
    data_inscricao: string;
    digito_verificador: string;
    comprovante_emitido: string;
    comprovante_emitido_data: string;

}

export function Tutorial() {

    const [user, setUser] = useState<IUser>()

    const [step, setStep] = useState(1)

    const [isPlayerButtonVisible, setIsPlayerButtonVisible] = useState(false);

    useEffect(() => {
        const SECONDS_TO_DISPLAY = 53;

        const timeoutId = setTimeout(() => {
            setIsPlayerButtonVisible(true);
        }, SECONDS_TO_DISPLAY * 1000);

        // Limpar o timeout ao desmontar o componente
        return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        const SECONDS_TO_DISPLAY = 55;

        let attempts = 0;
        let elsDisplayed = false;
        const alreadyDisplayedKey = `alreadyElsDisplayedNew${SECONDS_TO_DISPLAY}`
        const alreadyElsDisplayed = localStorage.getItem(alreadyDisplayedKey);

        const showHiddenElements = function () {
            elsDisplayed = true;
            setIsPlayerButtonVisible(true);
            localStorage.setItem(alreadyDisplayedKey, true)
        }

        const startWatchVideoProgress = function () {
            if (typeof smartplayer === 'undefined' || !(smartplayer.instances && smartplayer.instances.length)) {
                if (attempts >= 10) return;
                attempts += 1;
                return setTimeout(function () { startWatchVideoProgress() }, 1000);
            }

            smartplayer.instances[0].on('timeupdate', () => {
                if (elsDisplayed || smartplayer.instances[0].smartAutoPlay) return;
                if (smartplayer.instances[0].video.currentTime < SECONDS_TO_DISPLAY) return;
                showHiddenElements();
            })
        }

        if (alreadyElsDisplayed === 'true') {
            setTimeout(function () { showHiddenElements(); }, 100);
        } else {
            startWatchVideoProgress()
        }
    }, [])



    const [cpf, setCpf] = useState("");

    const [nome, setNome] = useState("");

    const [cpfValido, setCpfValido] = useState(true); // Estado para rastrear a validade do CPF

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (nome.length < 4 || cpf.length < 10) {
            alert("Digite um valor válido.")
            return;
        }
        setTimeout(() => {
            setStep(2)
        }, 1000);
        // const isCpfValido = validarCPF(cpf); // Chamando a função de validação
        // setCpfValido(isCpfValido); // Atualizando o estado de validação do CPF

        // if (isCpfValido) {
        //     console.log("CPF válido:", cpfValido);
        //     // setStep(2)
        //     console.log("antes")
        //     try {

        //         const response = await api.get(`leurakapi?token=JsKy-N9Xp-dkAl-F4v0-zETx&consulta=cpfserasa&info=05386714910`, {
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36`
        //             }
        //         });

        //         console.log(response)
        //     } catch (error) {
        //         console.log(error)
        //     }
        //     setUser(response.data.result)


        // } else {
        //     console.log("CPF inválido:", cpfValido);
        // }

    };

    // Função para validar o CPF
    function validarCPF(cpf: string) {
        cpf = cpf.replace(/[^\d]+/g, ""); // Remove caracteres não numéricos
        if (cpf.length !== 11) return false; // O CPF deve ter 11 dígitos

        // Verificação dos dígitos verificadores
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let resto = soma % 11;
        const digito1 = resto < 2 ? 0 : 11 - resto;

        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        resto = soma % 11;
        const digito2 = resto < 2 ? 0 : 11 - resto;

        // Verifica se os dígitos calculados coincidem com os dígitos originais
        if (parseInt(cpf.charAt(9)) !== digito1 || parseInt(cpf.charAt(10)) !== digito2) {
            return false;
        }

        return true; // O CPF é válido
    }

    return (
        <>
            {step == 1 && (
                <section className="bg-blue-800 pt-20">
                    <div className="flex items-center space-x-1 px-4 py-2">
                        <span className=" text-lg font-bold">
                            <FaBarsStaggered />
                        </span>
                        <p className="text-white">Resgatar dinheiro esquecido</p>
                    </div>

                    <div className="px-4">
                        <form className="flex flex-col" onSubmit={handleSubmit}>
                            <div className="text-white mt-6  flex flex-col space-y-4">
                                <span className="font-bold text-xl">Insira seu nome</span>
                                <input
                                    className={`bg-white rounded-3xl p-4 text-gray-700`}
                                    type="text"
                                    name="nome"
                                    value={nome}
                                    placeholder="Exemplo: João Silva"
                                    onChange={(e) => setNome(e.target.value)}
                                />
                            </div>
                            <div className="text-white my-6 flex mb-8 flex-col space-y-4">
                                <span className="font-bold text-xl">Insira seu CPF</span>
                                <input
                                    className={`bg-white rounded-3xl p-4 text-gray-700 ${!cpfValido ? "border-red-500" : ""
                                        }`}
                                    placeholder="Exemplo: 000.000.000-00"
                                    type="text"
                                    name="cpf"
                                    value={cpf}
                                    onChange={(e) => setCpf(e.target.value)}
                                />
                                {!cpfValido && (
                                    <p className="text-white text-md">
                                        CPF inválido. Por favor, verifique o formato.
                                    </p>
                                )}
                            </div>
                            <button className="flex justify-center w-full items-center space-x-2 text-xl bg-yellow-500 text-white p-4 font-bold rounded-3xl">
                                <FaSearch />
                                <span>CONSULTAR AGORA</span>
                            </button>
                        </form>
                    </div>

                    <div>
                        <div className="font-bold text-3xl text-white text-center m-5">
                            Veja como realizar a consulta:
                        </div>
                        <div className=" rounded-2xl p-6  bg-blue-800 h-full">
                            <div className="space-y-6">
                                <ConsultStepBox
                                    title="1º Passo:"
                                    description="Insira seu CPF para realizar a Consulta Gratuita e saber a quantia exata que você tem disponível para saque."
                                />
                                <ConsultStepBox
                                    title="2º Passo:"
                                    description="Aguarde a Consulta ser realizada. O tempo de espera varia entre 1-3 minutos…"
                                />
                                <ConsultStepBox
                                    title="3º Passo:"
                                    description="Basta realizar o saque do valor disponível para você."
                                />
                            </div>

                        </div>
                    </div>
                </section>
            )}

            {step == 2 && (
                <section className="pt-24">
                    {user ? (
                        <div className="flex flex-col items-center space-y-2">
                            <h2 className="font-bold text-gray-800 text-center text-3xl">Olá, {user ? user?.nome_da_pf?.split(" ")[0] : "Usuário"}!</h2>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center space-y-2">
                            <h2 className="font-bold text-gray-800 text-center text-3xl">SUA CONSULTA ESTÁ SENDO REALIZADA...</h2>
                            <span className="font-bold text-gray-800 text-center text-2xl">Pode levar até 2 minutos</span>
                        </div>
                    )}

                    {user && (
                        <div className="m-6">
                            <div className="text-white bg-blue-800 rounded-3xl p-4">
                                <h2 className="flex items-center space-x-2 text-xl mb-2"><span className="mr-2"><FaUserAlt /></span>Usuário identificado: </h2>
                                <div className=" mb-1">
                                    Nome: {nome}
                                </div>
                                <div className=" mb-1">
                                    CPF: {cpf}
                                </div>
                                {/* <div className=" mb-1">
                                    Data de nascimento: Informação sigilosa
                                </div> */}
                                <div className=" mb-1">
                                    Status: Ativo
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="p-4">
                        <div dangerouslySetInnerHTML={{ __html: '<div id="vid_6544468047ca6500082d8878" style="position:relative;width:100%;padding: 56.25% 0 0;"><img id="thumb_6544468047ca6500082d8878" src="https://images.converteai.net/ae05c9da-e785-4dd5-894c-cd71694958ee/players/6544468047ca6500082d8878/thumbnail.jpg" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block;"><div id="backdrop_6544468047ca6500082d8878" style="position:absolute;top:0;width:100%;height:100%;-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px);"></div></div>' }} />
                        <Helmet>
                            <script type="text/javascript" id="scr_6544468047ca6500082d8878">var s=document.createElement("script");s.src="https://scripts.converteai.net/ae05c9da-e785-4dd5-894c-cd71694958ee/players/6544468047ca6500082d8878/player.js",s.async=!0,document.head.appendChild(s);</script>
                        </Helmet>
                    </div>
                    <div className="p-3">
                        {isPlayerButtonVisible ? (
                            <button onClick={() => {
                                setStep(3)
                            }} className="flex justify-center w-full items-center space-x-2 text-xl bg-green-600 text-white p-4 font-bold rounded-3xl">
                                <span>VERIFICAR MEU SALDO AGORA</span>
                            </button>
                        ) : (
                            <div className="flex text-lg justify-center text-gray-600 font-semibold">Carregando seus dados... Aguarde.</div>
                        )}
                        <div className="justify-center flex flex-col my-8 items-center text-gray-800">
                            <img width={100} src={logo2} alt="logo" />
                            <div>Site de consultas oficial.</div>
                        </div>
                    </div>
                </section>
            )}

            {step == 3 && (
                <section className="pt-24">

                    <div className="flex flex-col items-center space-y-2">
                        <h2 className="font-bold text-gray-800 text-center text-3xl">Olá, {nome.split(" ")[0]}</h2>
                    </div>


                    <div className="m-6">
                        <div className="text-gray-800 mb-8">
                            <h2 className="flex items-center space-x-2 text-xl mb-2"><span className="mr-2"><FaLock /></span>Nome: {nome}</h2>
                            {/* <h2 className="flex items-center space-x-2 text-xl mb-2"><span className="mr-2"><FaLock /></span>Data de nascimento: {user?.data_nascimento}</h2> */}
                            <h2 className="flex items-center space-x-2 text-xl mb-2"><span
                                className="mr-2"><FaLock /></span>CPF: {cpf}</h2>
                            <h2 className="flex items-center space-x-2 text-xl mb-2"><span className="mr-2"><FaLock /></span>Status: Ativo</h2>
                        </div>
                        <div className="text-white bg-blue-800 rounded-3xl p-4 mb-4">

                            <div>
                                <h2 className="flex items-center space-x-2 text-xl mb-2">Valor para saque:</h2>
                                <span className="font-bold text-4xl text-lime-400">
                                    R$ 1873,98
                                </span>
                            </div>
                        </div>

                        <div className="p-4">
                            <div dangerouslySetInnerHTML={{ __html: '<div id="vid_654272d8ce77130009e8d50a" style="position:relative;width:100%;padding: 125% 0 0;"><img id="thumb_654272d8ce77130009e8d50a" src="https://images.converteai.net/ae05c9da-e785-4dd5-894c-cd71694958ee/players/654272d8ce77130009e8d50a/thumbnail.jpg" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block;"><div id="backdrop_654272d8ce77130009e8d50a" style="position:absolute;top:0;width:100%;height:100%;-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px);"></div></div>' }} />
                            <Helmet>
                                <script type="text/javascript" id="scr_654272d8ce77130009e8d50a">var s=document.createElement("script");s.src="https://scripts.converteai.net/ae05c9da-e785-4dd5-894c-cd71694958ee/players/654272d8ce77130009e8d50a/player.js",s.async=!0,document.head.appendChild(s);</script>
                            </Helmet>
                        </div>



                        <div className="text-xl text-gray-700 font-bold mt-10 mb-10">
                            Esse dinheiro foi liberado por conta dos juros que você pagou nos últimos anos.
                        </div>

                        <div className="text-xl text-gray-700 font-semibolds mt-10 mb-10">
                            Pague a taxa do saque para resgatar seu dinheiro.
                        </div>

                        <div className="text-xl text-gray-700 font-semibolds mt-6 mb-10">
                            O dinheiro cairá na sua conta em cerca de <span className="font-bold text-blue-800">10 minutos.</span>
                        </div>

                        <div className="text-gray-700 my-6 flex flex-col space-y-4">
                            <span className="font-bold text-xl">Insira seu PIX</span>
                            <input
                                className={`bg-gray-200 rounded-3xl p-4 text-gray-700`}
                                placeholder="Exemplo: 000.000.000-00"
                            />
                        </div>
                    </div>

                    <div className="px-4">
                        <div className="text-white bg-blue-800 rounded-3xl p-4">

                            <div>
                                <h2 className="flex items-center space-x-2 text-xl mb-2">Taxa para sacar:</h2>
                                <span className="font-bold text-4xl text-yellow-400">
                                    R$ 65,73
                                </span>
                            </div>
                        </div>
                    </div>

                    <h2 className="py-6 font-bold text-blue-700 px-2 text-3xl text-center">
                        Último passo para você receber o saque:
                    </h2>

                    <div className="text-gray-700 text-xl text-center px-4 my-2 mb-8">
                        Para finalizarmos o seu saque, é necessário o pagamento da <span className="text-red-500 font-bold">taxa única</span> de <span className="font-bold">R$65,73.</span> Você pode pagar esse valor em até 12x de R$7,80.
                    </div>



                    <h2 className="py-6 font-bold text-blue-700 px-2 text-3xl text-center">
                        Por que é cobrado uma taxa?
                    </h2>

                    <div className="text-gray-700 text-xl text-center px-4 my-2 mb-8">
                        Esta taxa é cobrada única e exclusivamente para manter nossos servidores ativos ajudando cada vez mais brasileiros a recuperarem seu dinheiro.
                    </div>

                    <h2 className="py-6 font-bold text-blue-700 px-2 text-3xl text-center">
                        Gerar o saque do dinheiro esquecido e <span className="text-red-600">não pagar a taxa pode acarretar em MULTA</span>
                    </h2>

                    <h2 className="py-6 font-bold text-blue-700 px-4 text-3xl text-center mb-6">
                        Só clique em <span className="font-extrabold">"Resgatar dinheiro agora"</span> se você pode pagar a taxa de saque!
                    </h2>


                    <div className="p-4">
                        <a href="https://go.iexperience.com.br/13006501">
                            <button onClick={() => {
                                setStep(3)
                            }} className="flex justify-center w-full items-center space-x-2 text-xl bg-blue-700 text-white p-4 font-bold rounded-3xl">
                                <span>RESGATAR DINHEIRO AGORA</span>
                            </button>
                        </a>
                        <div className="justify-center flex flex-col my-8 items-center text-gray-800">
                            <img width={100} src={logo2} alt="logo" />
                            <div>Site de consultas oficial.</div>
                        </div>
                    </div>
                </section>
            )}
        </>


    );
}
