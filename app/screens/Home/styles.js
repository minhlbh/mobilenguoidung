import { StyleSheet } from 'react-native';
import { colors } from '../../config/styles';

export default StyleSheet.create({
    textinfo: {
        //fontSize: 15,
        color: 'white'
    },
    panel1: {
        // paddingLeft: 15,
        // paddingRight: 15,
        // paddingLeft: 15,
        backgroundColor: '#0c879a'
    },
    textPanel1:{
        alignSelf: 'center',
        color:'#999',
        fontSize:12,
        fontWeight: 'bold'
    },
    itemImage: {
        width: 150,
        height: 120
    },
    textDividerTitle: {
        marginLeft: 20,
        marginTop: 8,
        marginBottom: 8,
        color: '#999',
        fontWeight: 'bold',
    },
    header:{
        backgroundColor: '#0f9cb3'
    },
    panel2:{
        backgroundColor:'#f2f2f2'
    },
    button:{
        width: 250,
        height: 80,
        backgroundColor:'#0c879a',
        marginTop:20,
        alignSelf:'center',
        marginBottom: 20
    },
    col:{
        borderLeftWidth:1,
        borderRightWidth:1,
        borderColor:'#f2f2f2',
        justifyContent:'center'
    }
})