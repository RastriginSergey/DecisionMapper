import React, {Component} from 'react';
import {connect} from 'react-redux';


class Pagination extends Component {
    constructor(props) {
        super(props);

        this.handlePrevious = this.handlePrevious.bind(this);
        this.createHref = this.createHref.bind(this);

    }

    isActive(current) {
        return current === this.props.page ? 'active' : ''
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
        let page = this.props.page;
        const buttons = () => {
            if (page === 1) {
                return [1, 2, 3].map(i => {
                    return <li key={i} className={`page-item ${this.isActive(i)}`}><a className="page-link"
                                                                                      href={this.createHref(i)}>{i}</a>
                    </li>
                });
            } else if (page > 1) {
                return [page - 1, page, page + 1].map(i => {
                    return <li
                        key={i}
                        className={`page-item ${this.isActive(i)}`}>
                        <a className="page-link" href={this.createHref(i)}>{i}</a>
                    </li>
                });
            }
        };

        return (
            <nav>
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${page === 1 ? 'disabled' : ''} `}>
                        <a className="page-link" href={this.createHref(page - 1)} onClick={this.handlePrevious}
                           tabIndex="-1">Previous</a>
                    </li>
                    {buttons()}
                    <li className="page-item">
                        <a className="page-link" href={this.createHref(page + 1)}>Next</a>
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
export default connect(mapStateToProps)(Pagination)