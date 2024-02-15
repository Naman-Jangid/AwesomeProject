import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from '../utils/colors';

interface SelectDropDownInterface {
  dataSet: any[];
  searchInputPlaceHolder: string;
  selectItemPlaceHolder: string;
  hanldeSelectItem: any;
  defaultValue?: string;
  isSearchable?: boolean;
}

const SelectDropDown = ({
  dataSet,
  searchInputPlaceHolder = '',
  selectItemPlaceHolder = '',
  hanldeSelectItem,
  defaultValue = '',
  isSearchable,
}: SelectDropDownInterface) => {
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState(dataSet);

  const onSearch = (search: string) => {
    if (search !== '') {
      let tempData = dataSet.filter(item => {
        return item.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
      setData(tempData);
    } else {
      setData(dataSet);
    }
  };

  useEffect(() => {
    setData(dataSet);
  }, [dataSet]);

  return (
    <SafeAreaView>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.mainTouchable}
        onPress={() => {
          setClicked(prev => !prev);
        }}>
        <Text style={{fontSize: 14, color: 'black'}}>
          {defaultValue ? defaultValue : `Select ${selectItemPlaceHolder}`}
        </Text>
        <FontAwesome
          name={clicked ? 'chevron-up' : 'chevron-down'}
          color={colors.defaultTheme}
          size={18}
        />
      </TouchableOpacity>
      {clicked ? (
        <View style={styles.dropDown}>
          {isSearchable && (
            <TextInput
              placeholder={`Search ${searchInputPlaceHolder}`}
              onChangeText={txt => onSearch(txt)}
              placeholderTextColor={colors.fadedGrey}
              style={styles.dropDownInput}
              selectionColor={colors.defaultTheme}
            />
          )}
          <ScrollView
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled={true}>
            {data?.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.dropDownRow}
                  onPress={() => {
                    hanldeSelectItem(item);
                    setClicked(prev => !prev);
                    onSearch('');
                  }}>
                  <Text style={{fontWeight: '500', color: colors.orderText}}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainTouchable: {
    width: '100%',
    height: 55,
    borderRadius: 9,
    // borderWidth: 1,
    backgroundColor: 'white',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    borderColor: colors.singletons.borderInput,
  },
  dropDown: {
    elevation: 5,
    marginTop: 15,
    maxHeight: 300,
    paddingVertical: 10,
    alignSelf: 'center',
    width: '97%',
    backgroundColor: 'white',
    borderRadius: 7,
  },
  dropDownInput: {
    width: '90%',
    height: 40,
    alignSelf: 'center',
    // borderWidth: 0.8,
    // borderColor: colors.defaultTheme,
    borderRadius: 7,
    marginTop: 15,
    paddingLeft: 20,
    color: 'black',
  },
  dropDownRow: {
    width: '85%',
    alignSelf: 'center',
    height: 50,
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: colors.fadedGrey,
  },
});

export default SelectDropDown;
