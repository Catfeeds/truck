import React, {Component} from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Image
} from "react-native";


export default class Rating extends Component {
    constructor(props) {
        super(props);
        let {
          rating,
          max,
          iconWidth,
          iconHeight,
          iconSelected,
          iconUnselected,
          editable
        } = this.props;
        this.state = {
            rating: rating || 0,
            max: max || 5,
            iconWidth: iconWidth || 16,
            iconHeight: iconHeight || 15,
            iconSelected: iconSelected || require('images/map/icon_haoping_orang.png'),
            iconUnselected: iconUnselected || require('images/map/icon_haoping_grey.png'),
            editable: editable != null ? editable : true
        }
    }

    componentWillReceiveProps( props ){
      let { rating } = props;
      this.setState({ rating: rating || 0});
    }

    _onRate(rating) {
        this.setState({rating});
        if (this.props.onRate) {
            this.props.onRate(rating)
        }
    }

    render() {
        var icons = [];
        let {
          rating,
          max,
          iconWidth,
          iconHeight,
          iconSelected,
          iconUnselected,
          editable
        } = this.state;
        for (let i = 1; i <= max; i++) {
            icons.push(
              <TouchableWithoutFeedback
                disabled={ !editable }
                key={ i }
                style={{height: iconHeight, width: iconWidth}}
                onPress={()=>this._onRate(i)}
                >
                <Image style={{height: iconHeight, width: iconWidth, marginRight:5}} source={rating >= i ? iconSelected : iconUnselected}/>
              </TouchableWithoutFeedback>)
        }
        return (
          <View style={[this.props.style,{flexDirection:'row'}]}>
              {icons}
          </View>
        )
    }
}
