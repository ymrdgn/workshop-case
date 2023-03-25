import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Skeleton } from 'primereact/skeleton';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '../styles/flags.css'
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';

function TableWithLazy({ postsList }) {
    const [virtualPosts, setVirtualPosts] = useState(Array.from({ length: 100 }));
    const [lazyLoading, setLazyLoading] = useState(false);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        body: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');


    let loadLazyTimeout = null;

    const loadPostsLazy = (event) => {
        !lazyLoading && setLazyLoading(true);

        if (loadLazyTimeout) {
            clearTimeout(loadLazyTimeout);
        }

        loadLazyTimeout = setTimeout(() => {
            let _virtualPosts = [...virtualPosts];
            let { first, last } = event;
            const loadedPosts = postsList.slice(first, last);
            Array.prototype.splice.apply(_virtualPosts, [...[first, last - first], ...loadedPosts]);
            setVirtualPosts(_virtualPosts);
            setLazyLoading(false);
        }, 1000);
    };

    const loadingTemplate = (options) => {
        return (
            <div className="flex align-items-center" style={{ height: '17px', flexGrow: '1', overflow: 'hidden' }}>
                <Skeleton width={options.cellEven ? (options.field === 'id' ? '20%' : '60%') : '60%'} height="1rem" />
            </div>
        );
    };
    
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
                <div className="title" style={{color:"#4338CA"}}>
                    <h2>Table with Lazy Loading</h2>
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
            <DataTable value={postsList} scrollable scrollHeight="400px"
                virtualScrollerOptions={{ lazy: true, onLazyLoad: loadPostsLazy, itemSize: 46, delay: 200, showLoader: true, loading: lazyLoading, loadingTemplate }}
                tableStyle={{ minWidth: '50rem' }}
                removableSort
                header={header}
                filters={filters}
                globalFilterFields={['title', 'body', 'id']}
                filterDisplay="row"
            >
                <Column field="id" header="Id" style={{ width: '10%' }} sortable filter filterPlaceholder="Search by ıd"></Column>
                <Column field="title" header="Title" style={{ width: '20%' }} sortable filter filterPlaceholder="Search by Title"></Column>
                <Column field="body" header="Body" style={{ width: '20%' }} sortable filter filterPlaceholder="Search by Body"></Column>
            </DataTable>
        </div>
    );
}

export default TableWithLazy;