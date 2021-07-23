

export type Column = {
    accessor: string
    Header: string

}
type Tariff = "Стандарт" | "Комфорт" | "Бизнес" | "Комфорт+" | "Эконом" | "Минивен" | "Лайт"

export type Columns = Column[]
export type TableData = {[key: string]: string}[]

type Car = {
    model: string
    mark: string
    tariffs: {[key: string]: {year: number}}
}


export const makeData = (data: { tariffs_list: Tariff[], cars: Car[] }): { data: { [p: string]: string }[];
    columns: Columns } => {
    //@ts-ignore
    const columns: Column = [{accessor: 'Марка и модель', Header: 'Марка и модель'}, ...data.tariffs_list.map(t => (
        { accessor: t, Header: t}
    ))]
    //@ts-ignore
    const cars: TableData = data.cars.map(c => {
        const mark = `${c.mark} ${c.model}`
        const tariffs: {[key: string]: string} = {}
        data.tariffs_list.forEach(cl => {
            const carTariffs = Object.keys(c.tariffs)
            if(carTariffs.includes(cl)) {
                tariffs[cl] = c.tariffs[cl].year.toString()
            } else {
                tariffs[cl] = '-'
            }

        })
        return {"Марка и модель": mark, ...tariffs}
    })


    // @ts-ignore
    return { columns, data: cars}
}