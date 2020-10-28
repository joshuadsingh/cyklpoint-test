import React, { useState, useEffect } from 'react';
import localData from '../data.json'
import countries from '../countries.json'

const STATE_KEY = "data";

if(!localStorage.getItem(STATE_KEY)){
    localStorage.setItem(STATE_KEY, JSON.stringify(localData))
}

export default () => {
    const [data, setData] = useState( JSON.parse(localStorage.getItem(STATE_KEY)) );
    const [currentItem, setCurrentItem] = useState({});
    const [pageOffset, setPageOffset] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        localStorage.setItem(STATE_KEY, JSON.stringify(data));
    }, [data]);

    const handleSubmit = (e) =>  {
        e.preventDefault();
        var formData = new FormData(e.target)
        var formObj = {};
        formData.forEach((value, key) => {
            (key === "name") ? formObj[key] = value : formObj[key] = parseInt(value)
        });
        const repeatedEntry = data.filter(field => formObj.id !== field.id);
        
        setData([...repeatedEntry, formObj]);

        document.querySelector('#form-target').reset();
        setCurrentItem({})

        const lastPage = data.length/pageOffset;
        setPageNumber(Math.floor(lastPage) + 1)
        window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});
    }

    const deleteItem = (item) =>  {
        const newData = data.filter(field => field.id !== item);
        setData(newData);
    }

    const editItem = (item) =>  {
        const itemData = data.filter(field => field.id === item)[0];
        setCurrentItem(itemData);
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    const clearForm = (e) =>  {
        e.preventDefault();
        document.querySelector('#form-target').reset();
        setCurrentItem({})
    }

    const filterSort = (type) =>  {
        let newData;
        switch (type) {
            case "country":
                newData = data.sort((a, b) => (a.country-b.country));
                setData([...newData]);
                break;

            case "name":
                newData = data.sort(function(a, b) {
                    return a.name.localeCompare(b.name);
                });
                setData([...newData]);
                break;

            case "id":
                newData = data.sort((a, b) => (a.id-b.id));;
                setData([...newData]);
                break;

            default:
                setData([...data]);
        }
    }

    const nextPage = () =>  {
        if(data.length > pageOffset*pageNumber){
            setPageNumber(pageNumber+1);
        }
    }

    const prevPage = () =>  {
        if(pageNumber > 1){
            setPageNumber(pageNumber-1);
        }
    }

    const pageItemCount = (e) => {
        setPageOffset(e.target.value)
        setPageNumber(1);
    }

    return (
        <>
            <section className="section-top-spacing">
                <div className="container">
                    <h2 className="pb-10">Add your user</h2>
                    <form id="form-target" className="create-user-form" onSubmit={handleSubmit}>
                        <div className="row row-alt">
                            <label htmlFor="">Id</label>
                            <input required name="id" type="number" defaultValue={currentItem.id} />
                        </div>
                        <div className="row row-alt">
                            <label htmlFor="">Name</label>
                            <input required name="name" type="text" defaultValue={currentItem.name} />
                        </div>
                        <div className="row row-alt">
                            <label htmlFor="">Country</label>
                            <select required name="country">
                                {
                                    countries.countries.map((item, index) => {
                                        if(currentItem.country === index){
                                            return(
                                                <option key={index} value={index} selected="selected">{item}</option>
                                            )
                                        } else {
                                            return(
                                                <option key={index} value={index}>{item}</option>
                                            )
                                        }
                                    })
                                }
                            </select>
                        </div>
                        <div className="d-flex justify-space-between align-items-center pt-20 ">
                            <button onClick={(e) => clearForm(e)} className="delete caption">Clear</button>
                            <button type="submit" className="btn caption">Add / Edit</button>
                        </div>
                    </form>
                </div>
            </section>
            <section className="section-spacing bg-grey">
                <div className="container">
                    <div className="d-flex justify-space-between align-items-center mob-to-column">
                        <h2>View users</h2>
                        <div>
                            <span className="mr-20">Items per page</span>
                            <select name="" onChange={pageItemCount} id="">
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                            </select>
                        </div>
                    </div>
                    <div className="user-data">
                        <div className="row row-new row-head">
                            <div onClick={() => filterSort("id")}>ID<svg x="0px" y="0px" viewBox="0 0 256 256" style={{enableBackground: "new 0 0 256 256"}} xmlSpace="preserve"><g><g><polygon points="225.813,48.907 128,146.72 30.187,48.907 0,79.093 128,207.093 256,79.093 "/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></div>
                            <div onClick={() => filterSort("name")}>NAME<svg x="0px" y="0px" viewBox="0 0 256 256" style={{enableBackground: "new 0 0 256 256"}} xmlSpace="preserve"><g><g><polygon points="225.813,48.907 128,146.72 30.187,48.907 0,79.093 128,207.093 256,79.093 "/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></div>
                            <div onClick={() => filterSort("country")}>COUNTRY<svg x="0px" y="0px" viewBox="0 0 256 256" style={{enableBackground: "new 0 0 256 256"}} xmlSpace="preserve"><g><g><polygon points="225.813,48.907 128,146.72 30.187,48.907 0,79.093 128,207.093 256,79.093 "/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></div>
                        </div>
                        {
                                data.slice(pageOffset*pageNumber - pageOffset, pageOffset*pageNumber).map(({id, name, country}) => {
                                    return(
                                        <div className="row row-new" key={id}>
                                            <div>{id}</div>
                                            <div>{name}</div>
                                            <div>{countries.countries[country]}</div>
                                            <div className="is-option edit-option" onClick={() => editItem(id)}>edit</div>
                                            <div className="is-option" onClick={() => deleteItem(id)}>X</div>
                                        </div>
                                    )
                                })
                            }
                    </div>
                    <div className="d-flex justify-space-between align-items-center pt-20">
                        <div onClick={prevPage} className="btn caption">prev</div>
                        <div className="page-num">{pageNumber}</div>
                        <div onClick={nextPage} className="btn caption">next</div>
                    </div>
                </div>
            </section>
        </>
    )
}