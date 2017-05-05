import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {withRouter} from 'react-router';


class Pagination extends Component {
    constructor(props) {
        super(props);

        this.handlePrevious = this.handlePrevious.bind(this);
        this.createHref = this.createHref.bind(this);
    }

    isActive(current) {
        const page = this.props.page;
        return current ===  page ? 'active' : '';
    }

    handlePrevious(e) {
        const page = this.props.page;
        if (page === 1) {
            return e.preventDefault();
        }
    }

    createHref(pageNumber) {
        return `/list/${pageNumber}`
    }


    render() {
        const page = this.props.page;
        const buttons = () => {
            if (page === 1) {
                return [1, 2, 3].map(i => {
                    return <li key={i} className={`page-item ${this.isActive(i)}`}>
                        <NavLink className="page-link" to={this.createHref(i)}>{i}</NavLink>
                    </li>
                });
            } else if (page > 1) {
                return [page - 1, page, page + 1].map(i => {
                    return <li
                        key={i}
                        className={`page-item ${this.isActive(i)}`}>
                        <NavLink className="page-link" to={this.createHref(i)}>{i}</NavLink>
                    </li>
                });
            }
        };

        return (
            <nav className="Pagination">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${page === 1 ? 'disabled' : ''} `}>
                        <NavLink className="page-link" to={this.createHref(page - 1)} onClick={this.handlePrevious}
                           tabIndex="-1">Previous</NavLink>
                    </li>
                    {buttons()}
                    <li className="page-item">
                        <NavLink className="page-link" to={this.createHref(page + 1)}>Next</NavLink>
                    </li>
                </ul>
            </nav>
        )
    }

}

function mapStateToProps(state, props) {
    return {
        page: state.page
    }
}
export default withRouter(connect(mapStateToProps)(Pagination));