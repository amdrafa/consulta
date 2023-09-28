interface IConsultStepBoxProps {
    title: string;
    description: string;
}

export function ConsultStepBox({ description, title }: IConsultStepBoxProps) {
    return (
        <section className="text-black bg-white rounded-3xl p-6">
            <div className="justify-center items-center flex flex-col text-black text-xl space-y-2">
                <h2 className="font-bold text-2xl text-blue-800">{title}</h2>
                <p className="text-center">{description}</p>
            </div>
        </section>
    )
}