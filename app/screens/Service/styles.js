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
        marginTop:5,
        
    },
    text:{
        color: colors.header.text,
        backgroundColor:'#0c879a'
    },
    input:{
        height:150, 
        borderLeftWidth:1,
        borderRightWidth:1,
        borderTopWidth:1,
        borderBottomWidth:1,
        backgroundColor: colors.header.text
    },
    button:{
        alignSelf:'center',
        width:110,
        marginTop: 10,
        backgroundColor:'#0c879a',
    }
})