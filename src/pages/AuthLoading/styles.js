import { ScaledSheet } from 'react-native-size-matters';

const INDICATOR_DIMENSION = 8;

const styles = ScaledSheet.create({
    container: {
        paddingTop: 30,
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
    },
    absolutePositioner: {
        position: 'absolute',
        top: 20,
        right: 10,
        flexDirection: 'row',
        alignItems:'center'
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
        marginTop: 30,
        height: '100%',
        width: '100%',
    },
    contentContainerStyle: {
        flexGrow: 1,
        alignItems: 'center',
    },
    buttonGrp: {
        height: '100%',
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    column:{
        width: '45%',
        height: undefined,
        aspectRatio: 1,
        marginBottom: 10
    },
    absoluteButtonText:{
        position: 'absolute',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default styles;
