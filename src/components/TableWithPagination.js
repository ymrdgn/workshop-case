import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '../styles/flags.css'
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';

function TableWithPagination({ postsList }) {
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        body: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');


    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="row">
                <div className="title" style={{ color: "#4338CA" }}>
                    <h2>Table with Pagination</h2>
                </div>
                <div className="flex justify-content-end">
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                    </span>
                </div>
            </div>
        );
    };

    const header = renderHeader();
    return (
        <div className="card">
            <DataTable value={postsList}
                paginator rows={5}
                tableStyle={{ minWidth: '50rem' }}
                removableSort
                header={header}
                filters={filters}
                globalFilterFields={['title', 'body', 'id']}
                filterDisplay="row"
            >
                <Column field="id" header="Id" style={{ width: '10%' }} sortable filter filterPlaceholder="Search by Id"></Column>
                <Column field="title" header="Title" style={{ width: '20%' }} sortable filter filterPlaceholder="Search by Title"></Column>
                <Column field="body" header="Body" style={{ width: '20%' }} sortable filter filterPlaceholder="Search by Body"></Column>
            </DataTable>
        </div>
    );
}

export default TableWithPagination;