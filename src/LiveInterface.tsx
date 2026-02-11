export function LiveInterface(props: { isActive: boolean }) {
    return (
        <>
            {props.isActive ?
                <>
                    <input type={"text"} placeholder={"Insert URL live..."} />
                    <input type={"text"} placeholder={"Insert URL live..."} />
                    <input type={"text"} placeholder={"Insert URL live..."} />
                    <input type={"text"} placeholder={"Insert URL live..."} />
                </> : null
            }

        </>
    );
}