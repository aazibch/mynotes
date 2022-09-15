import HashLoader from 'react-spinners/HashLoader';

const LoadingSpinner = (props) => {
    return (
        <HashLoader
            loading={props.loading}
            color="#80868b"
            cssOverride={{ display: 'block', margin: '2rem auto' }}
        />
    );
};

export default LoadingSpinner;
