const CountryForm = ({handleQueryChange}) => {
    return (
        <form>
            find countries <input onChange={handleQueryChange}></input>
        </form>
    )
}
export default CountryForm