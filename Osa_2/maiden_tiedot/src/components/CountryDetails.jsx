const CountryDetails = ({country}) => {
    return (
        <>
        <h2>{country.name.common}</h2>
        <p>capital {country.capital[0]} <br/>
        area {country.area}</p>

        <h3>Languages</h3>
        <ul>
            { Object.entries(country.languages).map(language => {
                return <li>{language[1]}</li>
            })
            }
        </ul>
        <img src={country.flags.png} />
        </>
    )
}

export default CountryDetails