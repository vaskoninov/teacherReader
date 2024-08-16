const TaleNavigation = (
    {
        direction,
        onClick,
        label,
        disabled
    }
) => {
    const buttonClass = direction === "next" ? 'btn btn-success' : 'btn btn-info';

    return (
        <div className="col-md-3 mb-3 mb-md-0">
            <button className={`${buttonClass} w-100`} onClick={onClick} disabled={disabled}>{label}</button>

        </div>
    )
}

export default TaleNavigation