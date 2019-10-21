import { ListItem, CheckBox, Icon, Card } from 'react-native-elements';
import NumericInput from 'react-native-numeric-input';
import Row from '../common/Row';
import { View, FlatList, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MenuItem = ({item, index, onPressNumericInput}) => {
  return (
      <ListItem
          key={index}
          rightElement={
              <NumericInput minValue={0}
                  initValue={item.quantity}
                  maxValue={50}
                  totalWidth={60} 
                  totalHeight={30}
                  onChange={onPressNumericInput} />
          }
          title = {
              item.isExtraItem ?
                <Row>
                    {item.name && <Label style = {styles.extraItemText} text={item.name}/>}
                </Row>
              :
                  <Row>
                    <View>
                        {
                          (item.veg === true) ?
                          <Icon
                            name='circle'
                            type='font-awesome'            
                            size={16}
                            color='#008000'
                          /> : 
                          <Icon
                            name='circle'
                            type='font-awesome'            
                            size={14}
                            color='#FF0000'
                          />
                      }
                    </View>
                    {item.name && <Label style = {styles.menuItemText} text={item.name}/>}
                </Row>
              
          }
          
          topDivider = { true }
          
          subtitle={'₹' + item.price}
          subtitleStyle={item.isExtraItem?styles.extraItemSubText:''}
          hideChevron={true}
      />
  );
};

MenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  mobile: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
    menuItemText: {
        fontWeight: 'bold',
        fontSize: 20
    },
    extraItemText: {
        fontSize: 20,
        marginLeft:30
    },
    extraItemSubText: {
        marginLeft:30
    }
});
