import { StyleSheet } from 'react-native';
import { colors } from '../../config/styles';

export default StyleSheet.create({
    header:{
        backgroundColor: colors.header.background,
    },
    textHeader:{
        color: colors.header.text
    },
    panel1:{
        backgroundColor: '#0c879a'
    },
    picker1:{
        width:  200,
        backgroundColor:'white',
        height:35,
        marginBottom: 20
    },
    picker2:{
        backgroundColor:'white',
        width: 300,
        alignSelf:'center',
        height: 35,
        marginTop:5
    },
    text:{
        backgroundColor: colors.header.background,
    }
})