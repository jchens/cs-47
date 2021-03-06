import React from 'react';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import { Dimensions, Image, Keyboard, Button, Component, TextInput, ActivityIndicator } from 'react-native';
import { Images, Colors } from './App/Themes'
import APIRequest from './App/Config/APIRequest'

import News from './App/Components/News'
import Search from './App/Components/Search'
import Logo from './App/Components/Logo'

export default class App extends React.Component {

  state = {
    loading: true,
    articles : [],
    searchText: '',
    category: ''
  }

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = async (searchTerm = '', category = '') => {
    this.setState({articles:[], loading: true});
    var resultArticles = [];
    if (category === '') {
      resultArticles = await APIRequest.requestSearchPosts(searchTerm);
    } else {
      resultArticles = await APIRequest.requestCategoryPosts(category);
    }
    console.log(resultArticles);
    this.setState({loading: false, articles: resultArticles})
  }

  // from starter files
  getArticleContent = () => {
    const {articles, loading} = this.state;

    let contentDisplated = null;
    if (loading) {
      contentDisplated = <ActivityIndicator size="large" color="black"/>;
    } else {
      contentDisplated = <News articles={articles}/>
    }

    return (
      <View style={{flex: 1}}>
        {contentDisplated}
      </View>
    )
  }

  render() {
    const {articles, loading} = this.state;

    return (
      <SafeAreaView style={styles.container}>

        {/*Logo*/}
        <Logo />

        {/*Search Bar*/}
        <Search loadArticles={this.loadArticles}/>

        {/*News*/}
        {this.getArticleContent()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.snow,
    justifyContent: 'center',
    alignItems: 'stretch',
  },

});
