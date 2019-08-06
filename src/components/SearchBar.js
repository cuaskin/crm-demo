import React from "react";

const categoryOptions = [
    "name", "surname", "job", "salary", "experience"
]

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            search: [],
            searchWord: "",
            searchBy: "name",
        }
    }

    handleInput = (e) => {
        this.setState({
            searchWord: e.target.value
        })

    }

    handleSelect = (e) => {
        this.setState({
            searchBy: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.searchBy, "<->", this.state.searchWord);
    }

    render() {
        const { searchWord, searchBy } = this.state;
        return (
            <div className="form-group mb-2 col-md-8 mb-4 card card-header">
                <form onSubmit={this.handleSubmit}>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <select
                                name={searchBy}
                                value={searchBy}
                                className="custom-select"
                                onChange={this.handleSelect}
                            >
                                {
                                    categoryOptions.map((item, index) => {
                                        let _item = item.charAt(0).toUpperCase() + item.slice(1);
                                        return <option key={index} value={item}>{_item}</option>
                                    })
                                }
                            </select>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                            value={searchWord}
                            onChange={this.handleInput}
                        />
                        <div className="input-group-append">
                            <button className="btn btn-block " type="submit">
                                <i className="fas fa-search" />
                            </button>
                        </div>

                    </div>

                </form>
            </div>
        )
    }
}

export default SearchBar;
