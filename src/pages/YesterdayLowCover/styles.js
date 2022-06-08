import { ScaledSheet } from 'react-native-size-matters';

const INDICATOR_DIMENSION = 8;

const styles = ScaledSheet.create({
    container: {
        paddingTop: 30,
        height: '100%',
        width: '100%',
        backgroundColor: '#DDDDDD',
    },
    absolutePositioner: {
        position: 'absolute',
        top: 20,
        right: 10
    },
    feedNotAvailible: {
        height: INDICATOR_DIMENSION,
        width: INDICATOR_DIMENSION,
        borderRadius: INDICATOR_DIMENSION / 2,
        borderColor: 'red',
        backgroundColor: 'red'
    },
    feedAvailible: {
        height: INDICATOR_DIMENSION,
        width: INDICATOR_DIMENSION,
        borderRadius: INDICATOR_DIMENSION / 2,
        borderColor: 'green',
        backgroundColor: 'green'
    },
    salutation: {
        fontSize: 20,
        color: 'black',
        marginLeft: 20
    },
    name: {
        fontSize: 25,
        color: '#8a8781',
    },
    scrollView: {
        height: '100%',
        width: '100%',
        borderColor: '#DDDDDD',
        borderWidth: 1,
        marginBottom: 10,
        backgroundColor: 'white'
    },
    contentContainerStyle: {
        flexGrow: 1,
        alignItems: 'center',
    },
});

export default styles;
