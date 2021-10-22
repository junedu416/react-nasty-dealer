const Chips = (props) => {
    const {buttonFunc} = props;

    return (
        <div>
            <button onClick={buttonFunc}>100</button>
            <button onClick={buttonFunc}>50</button>
            <button onClick={buttonFunc}>25</button>
        </div>
    )
}

export default Chips;