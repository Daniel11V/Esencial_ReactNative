const orderByDate = (arr) =>
    arr.sort((a, b) =>
        a.creationDate > b.creationDate
            ? 1
            : a.creationDate < b.creationDate
                ? -1
                : 0
    )

export default orderByDate;