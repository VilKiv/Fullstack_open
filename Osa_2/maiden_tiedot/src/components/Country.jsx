import CountryDetails from "./CountryDetails"

const Country = ({country,toggleDetails}) => {
    const label = !country.show
                ? "show"
                : "hide"

    const countryId = country.cca3
    return (
        <div>
            {country.name.common}
            <button onClick={()=> {return toggleDetails(countryId)}}>{label}</button>
            {country.show
                ? (<CountryDetails country={country}/>)
                : <></>
            }
        </div>
    ) 
}

export default Country