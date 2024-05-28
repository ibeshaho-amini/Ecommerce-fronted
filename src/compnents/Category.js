import React, { useState } from 'react';

export default function Category() {
    const [name, setName] = useState('');

    const handleClick = (e) => {
        e.preventDefault();
        const category = { name };
        console.log(category);
        fetch("http://localhost:8080/category/addcategory", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(category)
        }).then(() => {
            console.log("New Category added");
        });
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-4">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="card-title text-center mb-4"><u>Add Category</u></h1>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="categoryName" className="form-label">Category Name</label>
                                    <input type="text" className="form-control" id="categoryName" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={handleClick}>Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
