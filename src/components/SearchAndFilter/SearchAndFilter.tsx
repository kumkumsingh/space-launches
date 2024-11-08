import { Row, Col} from 'antd';

import SearchName from './GeneralSearch';
import GeneralFilter from './GeneralFilter';

import './SearchAndFilter.css';

const SearchAndFilter = () => {
    
    return (
        <Row gutter={16} style={{ marginBottom: '16px' }}>
            <Col xs={24} sm={16} md={16} lg={18}>
                <SearchName/>
            </Col>
            <Col xs={24} sm={8} md={8} lg={6}>
                <GeneralFilter />
            </Col>
        </Row>
    );
};

export default SearchAndFilter;
