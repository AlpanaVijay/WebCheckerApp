import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default class History extends React.Component {
  constructor() {
    super();
    this.state = {
      urlArray: [],
    };
  }
  getData = async () => {
    const data = localStorage.getItem('urlList');
    console.log(data);
    console.log('data: ', JSON.parse(data));
    var dataarray = JSON.parse(data);
    this.setState({ urlArray: dataarray });
    console.log(typeof this.state.urlArray);
  };
  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <View>
        <ScrollView>
          {this.state.urlArray.map((url) => {
            return (
              <View>
                <Text style={styles.titleStyle}>{url[0]}</Text> <Text> </Text>
                <Text style={styles.urlStyle}>{url[1]}</Text> <Text> </Text>
                <Text style={styles.statusStyle}>{url[2]}</Text> <Text> </Text>
              </View>
            );
          })}
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => this.props.navigation.navigate('WebsiteChecker')}>
            <Text style={styles.buttonText}> Go to WebsiteChecker Page </Text>
          </TouchableOpacity>
          
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleStyle: { fontSize: 18, fontWeight: 'bold' },
  urlStyle: { fontSize: 12, color: 'gray' },
  statusStyle: { fontSize: 18, color: 'blue' },
  buttonStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',

    height: 60,
    width: 150,
  },

  buttonText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
});
