import CountryDetails from "./CountryDetails"

const Country = ({country,toggleDetails}) => {
    if (!country) {
        return <></>
    }

    const label = !country.show
                ? "show"
                : "hide"

    const countryId = country.cca3
    if (!country.show) {
        return (
            <div>
                {country.name.common}
                <button onClick={()=> {return toggleDetails(countryId)}}>{label}</button>
            </div>
        ) 
    }
    return (
        <div>
            {country.name.common}
            <button onClick={()=> {return toggleDetails(countryId)}}>{label}</button>
            <CountryDetails country={country}/>
        </div>
    )
}

export default Country