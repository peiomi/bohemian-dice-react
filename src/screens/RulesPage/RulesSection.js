import { Container } from 'reactstrap';
import SubHeader from '../../components/SubHeader';

const RulesSection = (props) => {
    return (
        <Container>
            <SubHeader text={props.header} />
            <p>{props.text}</p>
        </Container>
    );
};

export default RulesSection;