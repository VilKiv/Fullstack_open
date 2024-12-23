const FilterForm = ({searchQuery,handleQueryChange}) => {
    return (
        <form>
            <div>
                filter shown with <input
                    value={searchQuery}
                    onChange={handleQueryChange}
                />
            </div>
        </form> 
    )
}

export default FilterForm
