import SubHeader from '../../components/SubHeader';

const RulesSection = (props) => {
    return (
        <div className='rules-section'>
            <SubHeader text={props.header} />
            <p>{props.text}</p>
        </div>
    );
};

export default RulesSection;