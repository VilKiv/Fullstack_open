import Weather from './Weather'

const CountryDetails = ({ country }) => {
    return (
        <>
            <h2>{country.name.common}</h2>
            <p>
                capital {country.capital[0]} <br />
                area {country.area}
            </p>

            <h3>Languages</h3>
            <ul>
                {Object.entries(country.languages).map(([key, value]) => (
                    <li key={key}>{value}</li>
                ))}
            </ul>
            
            <img src={country.flags.png} />

            <h2>Weather in {country.capital[0]}</h2>
            {country.capitalInfo.latlng 
                ? (<Weather lat={country.capitalInfo.latlng[0]} lon={country.capitalInfo.latlng[1]} />) 
                : (<p>No weather data available for capital</p>)}
        </>
    )
}

export default CountryDetails