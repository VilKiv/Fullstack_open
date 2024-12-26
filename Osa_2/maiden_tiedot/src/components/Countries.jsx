import Country from './Country'
import CountryDetails from './CountryDetails'

const Countries = ({countries}) => {
    if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    } else if (countries.length > 1) {
        return (
            <>
                {countries.map((country) =>
                    <Country
                        key={country.cca3}
                        name={country.name.common}
                    />
                )}
            </>
        )
    } else if (countries.length === 1){
        return (
            <CountryDetails country={countries[0]}/>
        )
    }

}

export default Countries