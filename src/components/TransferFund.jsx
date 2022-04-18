


export function TransferFund({ contact, maxCoins, onTransferCoins, handleChange }) {
    return (
        <section className="transfer-fund">
            <h3>Transfer coins to {contact.name}</h3>
            <h4>{maxCoins}</h4>
            <form onSubmit={onTransferCoins}>
                <label onChange={handleChange} htmlFor="transferAmount">Amount</label>
                <input onChange={handleChange} type="text" name="transferAmount" />
                <button>Transfer coins</button>
            </form>
        </section>
    );
}
