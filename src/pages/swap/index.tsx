const SwapPage = () => {
    // note: enter swap path unique to your desired ERC20 token.
    const SWAP_PATH = ''
    return (
        <iframe
            src={`https://app.uniswap.org/${SWAP_PATH}`}
            style={{
                height: window.innerHeight >= 720 ? '85rem' : '55rem',
                width: '100%'
            }}
        />
    )
}

export default SwapPage