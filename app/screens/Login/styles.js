import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../config/styles';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        padding: 5,
        backgroundColor: colors.background
    },
    logoContainer: {
        flex: 1,
        marginTop: deviceHeight / 35,
    },
    logoImage: {
        width: 150,
        height: 150,
        alignSelf: 'center'
    },
    logoText: {
        marginTop: 10,
        fontSize: 30,
        color: colors.light,
        alignSelf: 'center'
    },
    bg: {
        flex: 1,
        marginTop: 10,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 15,
        bottom: 0,
    },
    input: {
        fontSize: 15,
        color: colors.dark,
        paddingTop: 20
    },
    btnLogin: {
        marginTop: 30,
        alignSelf: 'center',
        backgroundColor: colors.dark
    },
    btnRegister: {
        marginTop: 30,
        alignSelf: 'center',
        borderColor: colors.dark
    },
    btnTransparent: {
        marginTop: 15,
        alignSelf: 'center',
    },
    activityIndicator: {
        alignItems: 'center',
        height: 80
    },
    item: {
        borderColor: colors.light
    },
    icon: {
        color: colors.dark,
    }, 
    close:{
        color: colors.light,
        fontSize: 30
    },
    textRegister:{
        width: deviceWidth/2.7 , 
        textAlign: 'center',
        color: colors.light 
    },
    textLogin:{
        width: deviceWidth/2.7 , 
        textAlign: 'center'
    }, form: {
        marginLeft: 47,
        marginRight: 47
    },
    form: {
        marginLeft: 47,
        marginRight: 47
    },
    header: {
        backgroundColor: colors.header.background
    },
    textHeader: {
        color: colors.header.text,
    },
    buttonFacebook:{
        width: '100%',
        height: 40
    },
    btnFaceContainer:{
        alignItems: 'center',
        marginTop: 15
    },
    iconFace:{
        color : '#3b5998',
        fontSize: 40
    }
});