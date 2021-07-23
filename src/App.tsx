import React, {useEffect, useMemo, useState} from 'react'
import {CarsApi} from "./api/carsApi";
import {makeData} from "./makeData";
import Table from "./api/components/Table";
import './App.css';

const App = () => {

    const [data, setData] = useState<any>({columns: [], data: []})
    const dataColumns = useMemo(() => data.columns, [data.columns])
    const dataResult = useMemo(() => data.data, [data.data])

    useEffect(() => {
        (async () => {
            try {
                const res = await CarsApi.getCars()
                setData(makeData(res.data))
            } catch (e) {
                console.error(e)
            }
        })()
    }, [])

    return <div className={"wrapper"}>
        <div className={"header"}>HEADER</div>
        <div className={"content-wrapper"}>
            <div className={"sidebar"}>SIDEBAR</div>
            <div className={"main"}>
                    <Table columns={dataColumns} data={dataResult}/>
            </div>
        </div>
        <div className={"footer"}>FOOTER</div>
    </div>
}
export default App

