import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import LinkPreview from 'react-native-link-preview';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      urlText: '',
      title: '',
      status: '',
      statusArray: [],
    };
  }

  // componentDidMount() {
  //  // setInterval(this.statusCheck, 50000);
  // }

  async fetchTitle(urltext) {
    try {
      await LinkPreview.getPreview(urltext).then((data) =>
        this.setState({ title: data.title })
      );
    } catch (error) {
      this.setState({ title: 'Error in fetching Title' });
    }
  }
  async statusCheck(urlText) {
    var urltext = urlText;
    await this.fetchTitle(urltext);
    try {
      var response = await fetch(urltext);

      if (response.ok) {
        this.setState({ status: 'Live' });
      }
    } catch (error) {
      this.setState({ status: 'Error' });
    }

    var url = [this.state.title, urltext, this.state.status];
    this.setState((state) => ({
      statusArray: [...this.state.statusArray, url],
    }));

    //console.log(this.state.statusArray);

    this.storeData();
    this.setState({ urlText: '' });
    this.setState({ title: '' });
  }

  storeData = async () => {
    try {
      const dataArray = this.state.statusArray;
      const jsonValue = JSON.stringify(dataArray);
      await AsyncStorage.setItem('urlList', jsonValue);
      console.log('data stored succefully in local storage');
    } catch (e) {
      console.log('error in saving data in local storage');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.appTitle}> Website Status Cheking App </Text>
        <View>
          <TextInput
            placeholder="Enter a website URL to check status"
            placeholderTextColor="gray"
            onChangeText={(text) => {
              this.setState({ urlText: text });
            }}
            value={this.state.urlText}
            style={styles.textInputstyle}
          />
          <TouchableOpacity
            onPress={() => {
              var urlText = this.state.urlText;
              urlText ? this.statusCheck(urlText) : Alert.alert('Enter URL');
            }}
            style={styles.addbuttonStyle}>
            <Text style={styles.buttonText}> Check Status</Text>{' '}
          </TouchableOpacity>
          <Text style={styles.statusMemoText}>
            {' '}
            (Enter URL in "https://www.websitename.com/" format){' '}
          </Text>
          {'\n\n'}
        </View>
        <View>
          {this.state.statusArray.map((url) => {
            return (
              <View>
                <Text>{'\n'}</Text>
                <Text>{this.state.title}</Text>
                <Text style={styles.titleStyle}>{url[0]}</Text> <Text> </Text>
                <Text style={styles.urlStyle}>{url[1]}</Text> <Text> </Text>
                <Text style={styles.statusStyle}>{url[2]}</Text> <Text> </Text>
                <TouchableOpacity
                  style={styles.addbuttonStyle}
                  onPress={() => {
                    statusCheck(this.state.urlText);
                  }}>
                  <Text style={styles.buttonText}> Refresh Status </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        <View style={styles.reloadButtonContainer}>
          <TouchableOpacity
            style={styles.reloadaddbuttonStyle}
            onPress={() => this.props.navigation.navigate('History')}>
            <Text style={styles.buttonText}>
              {' '}
              Check History of Website Status
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  appTitle: { alignSelf: 'center', fontSize: 20, fontWeight: 'bold' },
  textInputstyle: { marginTop: 20, borderWidth: 3 },
  statusMemoText: { fontSize: 12, color: 'gray' },
  addbuttonStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
    height: 40,
    width: 100,
  },
  titleStyle: { fontSize: 18, fontWeight: 'bold' },
  urlStyle: { fontSize: 12, color: 'gray' },
  statusStyle: { fontSize: 18, color: 'blue' },

  reloadaddbuttonStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
    height: 50,
    width: 250,
  },
  reloadButtonContainer: { marginTop: 20 },
  buttonText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
});
