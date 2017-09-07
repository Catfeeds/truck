const React = require('react');
const { ViewPropTypes } = ReactNative = require('react-native');
const {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
} = ReactNative;
const Button = (props) => {
  return <TouchableOpacity {...props}>
    {props.children}
  </TouchableOpacity>;
};

const DefaultTabBar = React.createClass({
  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
    backgroundColor: React.PropTypes.string,
    activeTextColor: React.PropTypes.string,
    inactiveTextColor: React.PropTypes.string,
    textStyle: Text.propTypes.style,
    tabStyle: ViewPropTypes.style,
    renderTab: React.PropTypes.func,
    underlineStyle: ViewPropTypes.style,
  },

  getDefaultProps() {
    return {
      activeTextColor: 'navy',
      inactiveTextColor: 'black',
      backgroundColor: null,
    };
  },

  renderTabOption(name, page) {
  },

  renderTab(name, page, isTabActive, onPressHandler, tabWidth) {
    const { activeTextColor, inactiveTextColor, textStyle } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';
    return <Button
      style={{flex: 0, }}
      key={name}
      accessible={true}
      accessibilityLabel={name}
      accessibilityTraits='button'
      onPress={() => onPressHandler(page)}
    >
      <View style={[styles.tab, this.props.tabStyle, { width : tabWidth, flex:0, } ]}>
        <Text style={[{color: textColor, fontWeight, }, textStyle, ]}>
          {name}
        </Text>
      </View>
    </Button>;
  },

  render() {
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;
    const tabWidth = this.props.tabWidth;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: tabWidth,
      height: 4,
      backgroundColor: 'navy',
      bottom: 0,
    };

    const translateX = this.props.scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0,  tabWidth],
    });
    return (
      <View style={[styles.tabs, {backgroundColor: this.props.backgroundColor, }, this.props.style, ]}>
      	<View style = {{ flexDirection: "row", alignItems: 'center',justifyContent: 'center',}}>
	        {this.props.tabs.map((name, page) => {
	          const isTabActive = this.props.activeTab === page;
	          const renderTab = this.props.renderTab || this.renderTab;
	          return renderTab(name, page, isTabActive, this.props.goToPage, tabWidth );
	        })}
        </View>
        <Animated.View
          style={[
            tabUnderlineStyle,
            {
              transform: [
                { translateX },
              ]
            },
            this.props.underlineStyle,
          ]}
        />
      </View>
    );
  },
});

const styles = StyleSheet.create({
  tab: {
  	flex:0,
    // flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    // paddingBottom: 10,
    // backgroundColor:"#eee",
    // paddingLeft: 15,
    // paddingRight: 15,
  },
  tabs: {
  	position:"relative",
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#ccc',
  },
});

module.exports = DefaultTabBar;
